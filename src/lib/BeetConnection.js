import { v4 as uuidv4 } from 'uuid';
import OTPAuth from 'otpauth';

import sha256 from "crypto-js/sha256.js";
import aes from "crypto-js/aes.js";
import ENC from 'crypto-js/enc-utf8.js';
import * as ed from '@noble/ed25519';

import {
  stringToTx,
  txToString,
  binanceInjection
} from './blockchains/Binance.js';
import { steemInjection } from './blockchains/Steem.js';
import { getWebSocketConnection } from "./socket.js";

class BeetConnection {

    constructor(appName, appHash, browser, origin) {
      this.appName = appName; // Name/identifier of the app making use of this client
      this.appHash = appHash;
      this.browser = browser;
      this.origin = origin;

      this.id = null;
      this.next_identification = null;

      this.connected = false; // State of WS Connection to Beet
      this.authenticated = false; // Whether this app has identified itself to Beet
      this.linked = false; // Whether this app has linked itself to a Beet account/id
      this.initialised = true; // Whether this client has been initialised (app name & domain/origin set)
      this.socket = null; // Holds the ws connection
      this.otp = null; // Holds the one-time-password generation for the linked account
      this.openRequests = []; // Holds pending API request promises to be resolved upon beet response
    }

    /**
     * Reset current connection data if 3 concurrent errors occur
     */
    reset() {
        this.connected = false;
        this.authenticated = false;
        this.identity = null;
        this.linked = false;
        this.socket = null;
        this.otp = null;
        this.openRequests = [];
        this.socket = null;
    }

    /**
     * Used to get the available id for a request and replace it with a new one while also returning its hash
     *
     * @returns {Object}
     */
    async fetch_ids() {
        if (this.connected && this.authenticated && this.linked) {
          let id = this.next_identification;
          let new_id = await uuidv4();
          this.next_identification = new_id;

          let next_hash = await sha256(new_id).toString();
          return {
              id: id,
              next_hash: next_hash.toString()
          };
        } else {
            throw new Error("You must be connected, authorised and linked.");
        }
    }

    /**
     * Requests to link to a Beet account/id on specified chain
     *
     * @param {String} chain Symbol of the chain to be linked
     * @param {String} requestDetails Details to be requested from the user, defaults to account (id and name)
     * @param {String} missingIdentityHash This initiates a relink, and pops up a special message in beet, use e.g. when client side cache gets lost
     * @returns {Object||Null}
     */
    async link(chain = 'ANY', requestDetails = ["account"], missingIdentityHash = null) {
      if (!this.connected) throw new Error("You must connect to Beet first.");
      if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");

      setTimeout(() => {
          return;
      }, this.options.linkTimeout);

      const privk = ed.utils.randomPrivateKey(); // 32-byte Uint8Array or string.
      this.secret = await ed.getSharedSecret(privk, this.beetkey);

      let next_id = uuidv4();
      let linkobj = {
          chain: chain,
          request: requestDetails,
          pubkey: await ed.getPublicKey(privk),
          next_hash: await sha256(next_id).toString()
      };

      if (!missingIdentityHash == null) {
          linkobj.identityhash = missingIdentityHash;
      }

      let linkRequest;
      try {
        linkRequest = await this.sendRequest(missingIdentityHash == null ? 'link' : 'relink', linkobj)
      } catch (error) {
        console.debug("link rejected", error);
        this.reset();
        throw error;
      }

      console.groupCollapsed("link success");
      this.linked = linkRequest.link;
      this.authenticated = linkRequest.authenticate;

      this.identity = linkRequest.existing
                        ? Object.assign(this.identity, linkRequest.requested)
                        : {
                            apphash: this.apphash,
                            identityhash: linkRequest.identityhash,
                            chain: linkRequest.chain,
                            appName: this.appName,
                            secret: this.secret.toString('hex'),
                            next_id: next_id,
                            requested: linkRequest.requested,
                        };

      this.otp = new OTPAuth.HOTP({
          issuer: "Beet",
          label: "BeetAuth",
          algorithm: "SHA1",
          digits: 32,
          counter: 0,
          secret: OTPAuth.Secret.fromHex(this.identity.secret)
      });

      console.groupEnd();
      console.debug("app fetched", this.identity);
      return this.identity;
    }

    /**
     * Connects to Beet instance. If one of the existing linked identities (returned by init()) is passed, it also tries to enable that link
     *
     * @param identity
     * @param options
     * @returns {Promise} Resolves to false if not connected after timeout, or to result of 'authenticate' Beet call
     */
    async connect(identity = null, options) {
        return new Promise((resolve, reject) => {
            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");

            // Setting options defaults
            this.options = Object.assign({
                initTimeout: 3000,
                linkTimeout: 30000
            }, options);

            // Auto failer
            setTimeout(() => {
                reject("Connection has timed out.");
            }, this.options.initTimeout);

            if (identity != null) {
                this.identity = identity;
            }

            let authobj = identity != null
                ? {
                    origin: this.origin,
                    appName: this.appName,
                    browser: this.browser,
                    identityhash: this.identity.identityhash,
                  }
                : {
                    origin: this.origin,
                    appName: this.appName,
                    browser: this.browser,
                  };


            let onopen = async (event) => {
                this.connected = true;
                let auth;
                try {
                  auth = await this.sendRequest('authenticate', authobj);
                } catch (error) {
                  console.error("socket.onopen authenticate rejected", error);
                  return;
                }

                console.groupCollapsed("authenticate"); // groupCollapsed
                console.log(event);
                this.authenticated = auth.authenticate;
                this.linked = auth.link;
                if (this.linked) {
                    this.otp = new OTPAuth.HOTP({
                        issuer: "Beet",
                        label: "BeetAuth",
                        algorithm: "SHA1",
                        digits: 32,
                        counter: 0,
                        secret: OTPAuth.Secret.fromHex(this.identity.secret)
                    });
                    console.debug("otp instantiated", this.identity.secret.toString());
                    this.identity = Object.assign(this.identity, auth.requested);
                } else {
                    this.beetkey = auth.pub_key;
                }
                console.groupEnd();
                return auth;
            };

            let onmessage = async (event) => {
                console.log("socket.onmessage"); // groupCollapsed
                console.log(event);
                let msg = JSON.parse(event.data);
                const openRequest = this.openRequests.find(
                    (x) => {
                        return x.id === msg.id || x.id.toString() === msg.id
                    }
                );
                if (!openRequest) return;
                if (msg.error) {
                    if (msg.encrypted) {
                        this.otp.counter = msg.id;
                        let key = this.otp.generate();
                        var response = aes.decrypt(msg.payload, key).toString(ENC);
                        console.debug("otp key generated", this.otp.counter);
                        console.debug("socket.onmessage decrypted payload", response);
                        openRequest.reject(response);
                    } else {
                        openRequest.reject(msg.payload.message);
                    }
                    if (msg.payload.code == 2) {
                        this.reset();
                    }
                } else {
                    if (msg.encrypted) {
                        this.otp.counter = msg.id;
                        let key = this.otp.generate();
                        let response = aes.decrypt(msg.payload, key).toString(ENC);
                        console.debug("otp key generated", this.otp.counter);
                        console.debug("socket.onmessage decrypted payload", response);
                        openRequest.resolve(response);
                    } else {
                        openRequest.resolve(msg.payload);
                    }
                }
                console.groupEnd();
            };

            let onclose = (event) => {
                this.connected = false;
                this.socket = null;
            };

            getWebSocketConnection(
                onopen.bind(this),
                onmessage.bind(this),
                onclose.bind(this)
            ).then(socket => {
                this.socket = socket;
            }).catch(reject);
        })
    }

    /**
     * Sends a request to Beet. If it is an API request, it is encrypted with AES using a one-time-pass generated by the request id (as a counter) and a previously established shared secret with Beet (using ECDH)
     *
     * @param {string} type Name of the call to execute
     * @param {object} payload
     * @returns {Promise} Resolving is done by Beet
     */
    async sendRequest(type, payload) {
        return new Promise(async (resolve, reject) => {
            console.groupCollapsed("sendRequest");
            //console.log(type, payload);
            let request = {}
            request.type = type;
            if (type == 'api') {
                let ids = await this.fetch_ids();
                payload.next_hash = ids.next_hash;
                request.id = ids.id;
                this.otp.counter = request.id;
                let key = this.otp.generate();
                //console.debug("otp key generated", this.otp.counter);
                //console.debug("sendRequest payload", payload);
                request.payload = aes.encrypt(JSON.stringify(payload), key).toString();
            } else {
                request.id = await uuidv4();
                request.payload = payload;
            }
            this.openRequests.push(Object.assign(request, { resolve, reject }));
            this.socket.send(JSON.stringify(request));
            console.log("Waiting for response .."); // groupEnd
        });
    }

    /**
     * Disconnects from Beet
     */
    disconnect() {
        this.socket.close();
        this.reset();
    }

    /**
     * Checks if Beet is connected
     *
     * @returns {boolean}
     */
    isConnected() {
        return this.connected;
    }

    inject(pointOfInjection, options = {sign: true, broadcast: true}) {
        if (this.identity.chain == "BTS") {
            if (!!pointOfInjection.prototype && !!pointOfInjection.prototype.get_type_operation) {
                // transaction builder
                return this.injectTransactionBuilder(pointOfInjection, options);
            }
        } else if (this.identity.chain == "STEEM") {
            if (pointOfInjection.broadcast) {
                return this.injectSteemLib(pointOfInjection, options);
            }
        } else if (this.identity.chain == "BNB_TEST") {
            if (!!pointOfInjection.placeOrder) {
                return this.injectBinanceLib(pointOfInjection, options);
            }
        }
        throw new Error("Unsupported point of injection")
    }

    /**
     * Enable the user to inject the binancejs library for advanced binance chain interaction
     *
     * @param {Module} binancejs User supplied binance js module
     * @param {object} options
     * @returns {Module}
     */
    injectBinanceLib(binancejs, options) {
        let sendRequest = this.sendRequest.bind(this);
        return binanceInjection(binancejs, options);
    }

    /**
     * Enable the user to inject the steemjs library for advanced steem chain interaction
     *
     * @param {Module} steemjs
     * @returns {Module}
     */
    injectSteemLib(steem) {
        let sendRequest = this.sendRequest.bind(this);
        return steemInjection(steem);
    }

    /**
     * Enable the user to inject the bitsharesjs library for advanced bitshares chain interaction
     *
     * @param {Module} TransactionBuilder
     * @param {object} options
     * @returns {Module}
     */
    injectTransactionBuilder(TransactionBuilder, options) {
        let sendRequest = this.sendRequest.bind(this);

        // if both options are set, we only want 1 beet call anyways
        if (options.sign && options.broadcast) {
            // forfeit private keys, and store public keys
            TransactionBuilder.prototype.add_signer = function add_signer(private_key, public_key) {
                if (typeof private_key !== "string" || !private_key || private_key !== "inject_wif") {
                    throw new Error("Do not inject wif while using Beet")
                }
                if (!this.signer_public_keys) {
                    this.signer_public_keys = [];
                }
                this.signer_public_keys.push(public_key);
            };
            TransactionBuilder.prototype.sign = function sign(chain_id = null) {
                // do nothing, wait for broadcast
                if (!this.tr_buffer) {
                    throw new Error("not finalized");
                }
                if (this.signed) {
                    throw new Error("already signed");
                }
                if (!this.signer_public_keys.length) {
                    throw new Error(
                        "Transaction was not signed. Do you have a private key? [no_signers]"
                    );
                }
                this.signed = true;
            };
            let send_to_beet = function sendToBeet(builder) {
                return new Promise((resolve, reject) => {
                    if (builder.operations.length != builder.operations.length) {
                        throw "Serialized and constructed operation count differs"
                    }
                    let args = ["signAndBroadcast", JSON.stringify(builder.toObject()), builder.signer_public_keys];
                    sendRequest('api', {
                        method: 'injectedCall',
                        params: args
                    }).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            };
            TransactionBuilder.prototype.broadcast = function broadcast(was_broadcast_callback) {
                return new Promise((resolve, reject) => {
                    // forward to beet
                    send_to_beet(this).then(
                        result => {
                            if (was_broadcast_callback) {
                                was_broadcast_callback();
                            }
                            resolve(result);
                        }
                    ).catch(err => {
                        reject(err);
                    });
                });
            }
        } else if (options.sign && !options.broadcast) {
            // forfeit private keys, and store public keys
            TransactionBuilder.prototype.add_signer = function add_signer(private_key, public_key) {
                if (typeof private_key !== "string" || !private_key || private_key !== "inject_wif") {
                    throw new Error("Do not inject wif while using Beet")
                }
                if (!this.signer_public_keys) {
                    this.signer_public_keys = [];
                }
                this.signer_public_keys.push(public_key);
            };
            TransactionBuilder.prototype.sign = function sign(chain_id = null) {
                return new Promise((resolve, reject) => {
                    let args = ["sign", JSON.stringify(this.toObject()), this.signer_public_keys];
                    sendRequest('api', {
                        method: 'injectedCall',
                        params: args
                    }).then((result) => {
                        // check that it's the same
                        console.log(result);
                        let tr = new TransactionBuilder(JSON.parse(result));
                        let sigs = tr.signatures;
                        tr.signatures = [];
                        if (JSON.stringify(tr) === JSON.stringify(this)) {
                            throw "Oh boy!"
                        }
                        this.signatures = sigs;
                        this.signer_private_keys = [];
                        this.signed = true;
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
                });
            };
        } else if (!options.sign && options.broadcast) {
            throw "Unsupported injection"
        }
        return TransactionBuilder;
    }

    /* API Requests :

       The following should be split into chain-specific modules as multi-chain support is finalised
       These are currently BTS only.

    */

    /**
     * Gets the currently linked Bitshares account
     *
     * @returns {Promise} Resolving is done by Beet
     */
    getAccount() {
        if (!!this.identity.account) {
            return this.identity.account;
        } else {
            throw "This connection does not have access to account details";
        }
    }

    /**
     * Gets the currently linked Bitshares account from Beet
     *
     * @returns {JSON} Current account from beet
     */
    async requestAccount() {
        let account;
        try {
          account = await this.sendRequest('api', {
              method: 'getAccount',
              params: {}
          });
        } catch (error) {
          console.log(error);
          return;
        }

        return JSON.parse(account);
    }

    /**
     * Requests a signature for an arbitrary transaction
     *
     * @param {object} payload
     * @returns {Promise} Resolving is done by Beet
     */
    async requestSignature(payload) {
      let sigReq;
      try {
        sigReq = await this.sendRequest('api', {
            method: 'requestSignature',
            params: payload
        });
      } catch (error) {
        console.log(error);
        return;
      }
      return sigReq;
    }

    /**
     * Requests a vote for specified votable object
     *
     * @param payload
     * @returns {Promise} Resolving is done by Beet
     */
    async voteFor(payload) {
      let vote;
      try {
        vote = this.sendRequest('api', {
            method: 'voteFor',
            params: payload
        });
      } catch (error) {
        console.log(error);
        return;
      }

      return vote;
    }

    /**
     * Requests to execute a library call for the linked chain
     *
     * @param payload
     * @returns {Promise} Resolving is done by Beet
     */
    async injectedCall(payload) {
      let injectedCall;
      try {
        injectedCall = await this.sendRequest('api', {
            method: 'injectedCall',
            params: payload
        });
      } catch (error) {
        console.log(error)
        return;
      }

      return injectedCall;
    }

    /**
     * Request a signed message with the given text in the common beet format
     *
     * @param text
     * @returns {Promise} Resolving is done by Beet
     */
    async signMessage(text) {
      let message;
      try {
        message = await this.sendRequest('api', {
            method: 'signMessage',
            params: text
        });
      } catch (error) {
        console.log(error);
        return;
      }

      if (message) {
        return JSON.parse(message);
      }
    }

    /**
     * Requests to verify a signed message with the given text in the common beet format
     *
     * @param text
     * @returns {Promise} Resolving is done by Beet
     */
    async verifyMessage(signedMessage) {
      let result;
      try {
        result = await this.sendRequest('api', {
            method: 'verifyMessage',
            params: signedMessage
        });
      } catch (error) {
        console.log(error);
        return;
      }

      return result;
    }

    /**
     * Requests to execute a transfer for the linked chain
     *
     * @param payload
     * @returns {Promise} Resolving is done by Beet
     */
    async transfer(payload) {
      let beetTransfer;
      try {
        beetTransfer = await this.sendRequest('api', {
            method: 'transfer',
            params: payload
        });
      } catch (error) {
        console.log(error)
        return;
      }

      return beetTransfer;
    }
}

export default BeetConnection;

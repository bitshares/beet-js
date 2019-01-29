const OTPAuth = require('otpauth');
import CryptoJS from "crypto-js";
import browser from 'browser-detect';
import BeetClientDB from './lib/BeetClientDB';
import "isomorphic-fetch";
import { ec as EC } from "elliptic"; 
var ec = new EC('curve25519');

class Beet {

    constructor() {
        this.host = 'wss://local.get-beet.io:60556';
        this.connected = false; // State of WS Connection to Beet
        this.authenticated = false; // Whether this app has identified itself to Beet 
        this.linked = false; // Whether this app has linked itself to a Beet account/id
        this.initialised = false; // Whether this client has been initialised (app name & domain/origin set)
        this.socket = null; // Holds the ws connection
        this.appName = null; // Name/identifier of the app making use of this client
        this.otp = null;  // Holds the one-time-password generation for the linked account
        this.openRequests = []; // Holds pending API request promises to be resolved upon beet response
        this.origin = null; // Holds domain-name/origin of this instance
    }
    reset() {
        this.connected = false;
        this.authenticated = false;
        this.linked = false;        
        this.socket = null;        
        this.otp = null;
        this.openRequests = [];        
        this.socket = null;
    }

    /**
     * Assuming beet-js is deployed on www.mydomain.com. Running init('My Cool App') will set appName to 'My Cool App' and origin to 'www.mydomain.com'
     * and return all cached linked accounts
     *
     * @param {string} appName Name of the application that wants to use Beet
     * @returns {array} appStore
     */
    async init(appName) {
        if (this.initialised === false) {
            this.appName = appName;
            this.origin = appName; // FIXME put in actual origin
            if (typeof location !== 'undefined') {
                if (location.hasOwnProperty('hostname') && location.hostname.length && location.hostname !== 'localhost') {
                    this.origin = location.hostname;
                }
            }
        }
        this.detected = browser();
        this.keyhash = CryptoJS.SHA256(this.detected.name + ' ' + this.origin + ' ' + this.appName).toString();
        let appstore;
        appstore = await BeetClientDB.apps.where("keyhash").equals(this.keyhash).toArray();
        this.initialised = true;
        return appstore;
    }

    /**
     * Pings Beet by hecking the version
     *
     * @returns {Promise} Resolves to the installed version of Beet
     */
    ping() { 
        let ping;
        return new Promise(async (resolve, reject) => {
            try {
                ping = new WebSocket(this.host);
                ping.onopen = function (evt) {
                    ping.send('{ "type" : "version"}');
                }
                ping.onmessage = function (evt) {
                    let msg = JSON.parse(evt.data);
                    if (msg.type == "version") {
                        resolve(msg.result);
                    } else {
                        reject(false);
                    }
                    ping.close();
                }
            } catch (e) {
                reject(false);
            }
        });

    }

    /**
     * Uses ping() with a timeout to check if Beet is installed.
     *
     * @returns {Promise} Resolves to true (if installed) and false (not installed)
     */
    isInstalled() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(false);
            }, 500);
            this.ping().then(found => {
                if (found) resolve(found);
            });

        })
    }

    /**
     * Generates a random id for an API request
     *
     * @returns {number} A random id
     */
    generate_id() {
        return Math.round(Math.random() * 100000000 + 1);
    }
    // Used to get the available id for a request and replace it with a new one while also returning its hash
    async fetch_ids() {
        
        let app = await BeetClientDB.apps.where("apphash").equals(this.identity.apphash).first();        
        let id = app.next_id;
        let new_id = await this.next_id();
        let next_hash = await CryptoJS.SHA256('' + new_id).toString();
        return {
            id: id,
            next_hash: next_hash.toString()
        };
    }

    /**
     * Generates a new id and stores it as the next one to be used
     *
     * @returns {number} The next id to be used
     */
    async next_id() {
        if (this.connected && this.authenticated && this.linked) {
            let new_id = this.generate_id();
            
            await BeetClientDB.apps.where("apphash").equals(this.identity.apphash).modify({
                next_id: new_id
            });
            return new_id;
        } else {
            throw new Error("You must be connected, authorised and linked.");
        }
    }

    /**
     * Requests to link to a Beet account/id on specified chain
     *
     * @param {String} chain Symbol of the chain to be linked
     * @returns {Promise} Resolves to false if not linked after timeout, or to result of 'link' Beet call
     */
    async link(chain = 'BTS') {
        return new Promise(async (resolve, reject) => {
            if (!this.connected) throw new Error("You must connect to Beet first.");
            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");            
            setTimeout(() => {
                resolve(false);
            }, this.options.linkTimeout);
            let keypair= ec.genKeyPair();
            this.privk = keypair.getPrivate();
            let pubkey = keypair.getPublic().encode('hex');            
            this.secret =keypair.derive(ec.keyFromPublic(this.beetkey, 'hex').getPublic());            
            var next_id = Math.round(Math.random() * 100000000 + 1);
            this.chain = chain;
            var next_hash = await CryptoJS.SHA256('' + next_id);
            let linkobj = {
                chain: this.chain,
                pubkey: pubkey,
                next_hash: next_hash.toString()
            }
            var link = this.sendRequest('link', linkobj);
            link.then(async res => {
                this.apphash = CryptoJS.SHA256(this.detected.name + ' ' + this.origin + ' ' + this.appName + ' ' + this.chain + ' ' + res.account_id).toString();
                this.appstore = await BeetClientDB.apps.add({
                    keyhash: this.keyhash,
                    apphash: this.apphash,
                    account_id: res.account_id,
                    chain: this.chain,
                    appName: this.appName,
                    secret: this.secret.toString('hex'),
                    next_id: next_id
                });
                this.authenticated = res.authenticate;
                this.linked = res.link;
                this.identity = await BeetClientDB.apps.where("apphash").equals(this.apphash).first();

                this.otp = new OTPAuth.HOTP({
                    issuer: "Beet",
                    label: "BeetAuth",
                    algorithm: "SHA1",
                    digits: 32,
                    counter: 0,
                    secret: OTPAuth.Secret.fromHex(this.identity.secret)
                });
                console.log("otp instantiated", this.identity.secret.toString());
                resolve(res);
            }).catch(rej => {
                reject(rej);
            });
        });

    }

    /**
     * Connects to Beet instance. If one of the existing linked identities (returned by init()) is passed, it also tries to enable that link
     *
     * @param identity
     * @param options
     * @returns {Promise} Resolves to false if not connected after timeout, or to result of 'authenticate' Beet call
     */
    async connect(identity = null, options) {
        return new Promise(resolve => {
            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");

            // Setting options defaults
            this.options = Object.assign({
                initTimeout: 10000,
                linkTimeout: 30000
            }, options);

            // Auto failer
            setTimeout(() => {
                resolve(false);
            }, this.options.initTimeout);

            let authobj;
            if (identity != null) {
                this.identity = identity;
                authobj = {
                    origin: this.origin,
                    appName: this.appName,
                    browser: this.detected.name,
                    apphash: this.identity.apphash
                };
            } else {
                authobj = {
                    origin: this.origin,
                    appName: this.appName,
                    browser: this.detected.name,
                };
            }
            this.socket = new WebSocket(this.host);
            this.socket.onopen = async (evt) => {
                this.connected = true;
                var auth = this.sendRequest('authenticate', authobj);
                auth.then(res => {
                    console.log("connect", res);
                    this.authenticated = res.authenticate;
                    this.linked = res.link;
                    if (this.linked) {
                        this.otp = new OTPAuth.HOTP({
                            issuer: "Beet",
                            label: "BeetAuth",
                            algorithm: "SHA1",
                            digits: 32,
                            counter: 0,
                            secret: OTPAuth.Secret.fromHex(this.identity.secret)
                        });
                        console.log("otp instantiated", this.identity.secret.toString());
                    } else {
                        this.beetkey = res.pub_key;
                    }
                    console.log(this.identity.secret);
                    resolve(res);

                }).catch(rej => {
                    resolve(rej);
                });
            }
            this.socket.onclose = function (evt) {
                
                this.connected = false;
                this.socket = null;
            }
            this.socket.onmessage = async (evt) => {
                console.log("socket.onmessage", evt);
                let msg = JSON.parse(evt.data);
                const openRequest = this.openRequests.find(
                    (x) => {
                        return x.id === msg.id ||x.id.toString() === msg.id
                    }
                );
                if (!openRequest) return;
                if (msg.error) {
                    if (msg.encrypted) {
                        this.otp.counter = msg.id;
                        let key = this.otp.generate();
                        var response = CryptoJS.AES.decrypt(msg.payload, key).toString(CryptoJS.enc.Utf8);
                        console.log("otp key generated", this.otp.counter);
                        console.log("socket.onmessage payload", response);
                        openRequest.reject(response);
                    } else {
                        openRequest.reject(msg.payload.message);
                    }
                    if(msg.payload.code == 2) {
                        await BeetClientDB.apps.where("apphash").equals(this.identity.apphash).delete();
                        this.reset();
                    }
                } else {
                    if (msg.encrypted) {
                        this.otp.counter = msg.id;
                        let key = this.otp.generate();
                        var response = CryptoJS.AES.decrypt(msg.payload, key).toString(CryptoJS.enc.Utf8);
                        console.log("otp key generated", this.otp.counter);
                        console.log("socket.onmessage payload", response);
                        openRequest.resolve(response);
                    } else {
                        openRequest.resolve(msg.payload);
                    }
                }
            }

        })
    }

    /**
     * Sends a request to Beet. If it is an API request, it is encrypted with AES using a one-time-pass generated by the request id (as a counter) and a previously established shared secret with Beet (using ECDH)
     *
     * @param {string} type Name of the call to execute
     * @param {dict} payload
     * @returns {Promise} Resolving is done by Beet
     */
    async sendRequest(type, payload) {
        console.log("sendRequest", type, payload);
        return new Promise(async (resolve, reject) => {
            let request = {}
            request.type = type;
            if (type == 'api') {
                let ids = await this.fetch_ids();
                payload.next_hash = ids.next_hash;
                request.id = ids.id;
                this.otp.counter = request.id;
                let key = this.otp.generate();
                console.log("otp key generated", this.otp.counter);
                console.log("sendRequest payload", payload);
                request.payload = CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
            } else {
                request.id = await this.generate_id();
                request.payload = payload;
            }
            this.openRequests.push(Object.assign(request, {
                resolve,
                reject
            }));
            this.socket.send(JSON.stringify(request));
            console.log('sendRequest dispatched', request);
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

    /* API Requests :

       The following should be split into chain-specific modules as multi-chain support is finalised
       These are currently BTS only.

    */

    /**
     * Gets the currently linked account
     *
     * @returns {Promise} Resolving is done by Beet
     */
    getAccount() {        
        return this.sendRequest('api', {
            method: 'getAccount',
            params: {}
        });
    }

    /**
     * Requests a signature for an arbitrary transaction
     *
     * @param {dict} payload
     * @returns {Promise} Resolving is done by Beet
     */
    requestSignature(payload) {
        return this.sendRequest('api', {
            method: 'requestSignature',
            params: payload
        });
    }

    /**
     * Requests a vote for specified votable object
     *
     * @param payload
     * @returns {Promise} Resolving is done by Beet
     */
    voteFor(payload) {
        return this.sendRequest('api', {
            method: 'voteFor',
            params: payload
        });
    }

}


class Holder {
    constructor(_companion) {
        this.beet = _companion;
    }
}


let holder = new Holder(new Beet());
if (typeof window !== 'undefined') window.beet = holder.beet;

export default holder;
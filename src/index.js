//import BeetClient from './lib/BeetClient';
const OTPAuth = require('otpauth');
import CryptoJS from "crypto-js";
import browser from 'browser-detect';
import crypto from 'crypto';
import eccrypto from 'eccrypto';
import BeetClientDB from './lib/BeetClientDB';
import "isomorphic-fetch";









class Beet {

    constructor() {
        this.host = 'wss://local.get-beet.io:60556';
        this.connected = false;
        this.authenticated = false;
        this.linked = false;
        this.initialised = false;
        this.socket = null;
        this.appName = null;
        this.otp = null;
        this.openRequests = [];
        this.origin = null;
        this.socket = null;
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
    async init(app) {
        if (this.initialised === false) {
            this.appName = app;
            this.origin = app;
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
    isInstalled() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(false);
            }, 3000);
            this.ping().then(found => {
                if (found) resolve(found);
            });

        })
    }
    async get_id() {
        return Math.round(Math.random() * 100000000 + 1);
    }
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
    async next_id() {
        if (this.connected && this.authenticated && this.linked) {
            let next_id = Math.round(Math.random() * 100000000 + 1);
            await BeetClientDB.apps.where("apphash").equals(this.identity.apphash).modify({
                next_id: next_id
            });
            return next_id;
        } else {
            throw new Error("You must be connected, authorised and linked.");
        }
    }
    async link(chain = 'BTS') {
        return new Promise(async (resolve, reject) => {
            if (!this.connected) throw new Error("You must connect to Beet first.");
            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");            
            setTimeout(() => {
                resolve(false);
            }, this.options.linkTimeout);
            this.privk = crypto.randomBytes(32);
            let pubkey = await eccrypto.getPublic(this.privk).toString('hex');
            this.secret = await eccrypto.derive(this.privk, Buffer.from(this.beetkey, 'hex'));
            var next_id = Math.round(Math.random() * 100000000 + 1);
            this.chain = "BTS";
            var next_hash = await CryptoJS.SHA256('' + next_id);
            let linkobj = {
                chain: "BTS",
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
                resolve(res);
            }).catch(rej => {
                reject(rej);
            });
        });

    }
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
                    console.log(res);
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
                    } else {
                        this.beetkey = res.pub_key;
                    }
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
                console.log('received');
                let msg = JSON.parse(evt.data);
                const openRequest = this.openRequests.find(x => x.id === msg.id);
                if (!openRequest) return;
                if (msg.error) {
                    openRequest.reject(msg.payload.message);
                    if(msg.payload.code==2) {
                        await BeetClientDB.apps.where("apphash").equals(this.identity.apphash).delete();
                        this.reset();
                    }
                } else {
                    if (msg.encrypted) {
                        this.otp.counter = msg.id;
                        let key = this.otp.generate();
                        var response = CryptoJS.AES.decrypt(msg.payload, key).toString(CryptoJS.enc.Utf8);
                        console.log(response);
                        openRequest.resolve(response);
                    } else {
                        openRequest.resolve(msg.payload);
                    }
                }
            }

        })
    }
    async sendRequest(type, payload) {
        return new Promise(async (resolve, reject) => {
            let request = {}
            request.type = type;
            if (type == 'api') {
                let ids = await this.fetch_ids();
                console.log(ids);
                payload.next_hash = ids.next_hash;
                request.id = ids.id;
                this.otp.counter = request.id;
                let key = this.otp.generate();
                request.payload = CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
            } else {
                request.id = await this.get_id();
                request.payload = payload;
            }
            this.openRequests.push(Object.assign(request, {
                resolve,
                reject
            }));
            this.socket.send(JSON.stringify(request));
            console.log('sent');
        });
    }
    disconnect() {
        this.socket.close();
        this.reset();
    }

    isConnected() {
        return this.connected;
    }


    getAccount() {        
        return this.sendRequest('api', {
            method: 'getAccount',
            params: {}
        });
    }


    requestSignature(payload) {
        
        return this.sendRequest('api', {
            method: 'requestSignature',
            params: payload
        });
    }

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
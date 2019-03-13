import CryptoJS from "crypto-js";
import browser from 'browser-detect';
import "isomorphic-fetch";
import BeetClientDB from "./BeetClientDB";
import BeetConnection from "./BeetConnection";

class BeetApp {

    constructor(appName) {
        this.appName = appName;
        this.origin = appName; // FIXME put in actual origin
        if (typeof location !== 'undefined') {
            if (location.hasOwnProperty('hostname') && location.hostname.length && location.hostname !== 'localhost') {
                this.origin = location.hostname;
            }
        }
        this.detected = browser();
        this.appHash = CryptoJS.SHA256(this.detected.name + ' ' + this.origin + ' ' + this.appName).toString();

    }

    async init() {
        this.appstore = await BeetClientDB.apps.where("apphash").equals(this.appHash).toArray();
        this._beetConnections = {};
    }

    list() {
        return this.appstore;
    }

    async getConnection(identity) {
        if (this._beetConnections[identity.identityhash]) {
            return this._beetConnections[identity.identityhash];
        } else {
            let beetConnection = new BeetConnection(this.appName);
            try {
                await beetConnection.connect(identity);
                this._beetConnections[identity.identityhash] = beetConnection;
                return this._beetConnections[identity.identityhash];
            } catch (err) {
                throw err;
                // TODO: if linking error, re-link transparently instead
            }
        }
    }

    async getChainConnection(chainType, existing = true) {
        if (existing) {
            let compatibleIdentities = this.appstore.filter(id => {
                return id.chain == chainType
            });
            if (compatibleIdentities.length > 0) {
                try {
                    let beetConnection = this.getConnection(compatibleIdentities[0]);
                    return beetConnection;
                } catch (err) {
                    return this.getChainConnection(chainType, false);
                }
            } else {
                return this.getChainConnection(chainType, false);
            }
        } else {
            let beetConnection = new BeetConnection(this.appName);
            let isReady = await beetConnection.connect();
            let identityhash = await beetConnection.link(chainType);
            this._beetConnections[identityhash] = beetConnection;
            return this._beetConnections[identityhash];
        }
    }

    async getAnyConnection(existing = true) {
        if (existing) {

            if (this.appstore.length > 0) {
                try {
                    let beetConnection = this.getConnection(this.appstore[0]);
                    return beetConnection;
                } catch (err) {
                    return this.getAnyConnection(false);
                }
            } else {
                return this.getAnyConnection(false);
            }
        } else {
            let beetConnection = new BeetConnection(this.appName);
            let isReady = await beetConnection.connect();
            let identityhash = await beetConnection.link(); // Need to modify link to allow for no chain preference

            this._beetConnections[identityhash] = beetConnection;
            return this._beetConnections[identityhash];
        }
    }
}

export default BeetApp;
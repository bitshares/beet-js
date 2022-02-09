import CryptoJS from "crypto-js";
import BeetClientDB from "./BeetClientDB.js";
import BeetConnection from "./BeetConnection.js";

class BeetApp {

    constructor(appName, browser, origin) {
        this.appName = appName;
        this.browser = browser;
        this.origin = origin;
        this.appHash = CryptoJS.SHA256(this.browser + ' ' + this.origin + ' ' + this.appName).toString();
    }

    async init() {
        this.appstore = await BeetClientDB.apps.where("apphash").equals(this.appHash).toArray();
        this._beetConnections = {};
    }

    list() {
        return this.appstore;
    }

    /**
     * Return a new BeetConnection
     *
     * @param {string|null} chainType
     * @param {string|null} identity
     * @returns BeetConnection
     */
    async newConnection (chainType = null, identity = null) {
      let beetConnection = new BeetConnection(this.appName, this.appHash, this.browser, this.origin);
      let isReady;
      let identityhash;
      try {
        isReady = identity
          ? await beetConnection.connect(identity)
          : await beetConnection.connect();
      } catch (error) {
        console.log(error);
        throw error;
      }

      try {
        identityhash = chainType
          ? await beetConnection.link(chainType)
          : await beetConnection.link();
      } catch (error) {
        console.log(error);
        throw error;
      }

      this._beetConnections[identityhash] = beetConnection;
      return this._beetConnections[identityhash];
    }

    /**
     * Try to use a specific existing BeetConnection identity, otherwise create a new one.
     *
     * @param Object identity
     * @returns BeetConnection
     */
    async getConnection(identity) {
        if (identity && identity.identityhash && this._beetConnections[identity.identityhash]) {
          return this._beetConnections[identity.identityhash];
        } else {
          return newConnection(null, identity);
        }
    }

    /**
     * Connect to a specific blockchain with Beet
     *
     * @param String chainType
     * @param Bool existing
     * @returns BeetConnection
     */
    async getChainConnection(chainType, existing = true) {
        let beetConnection;
        if (existing) {
            let compatibleIdentities = this.appstore.filter(id => {
                return id.chain == chainType
            });
            if (compatibleIdentities.length > 0) {
                try {
                  beetConnection = this.getConnection(compatibleIdentities[0]);
                } catch (err) {
                  console.log(err)
                }

                if (beetConnection) {
                  return beetConnection;
                }
            }
        }

        return newConnection(chainType);
    }


    /**
     * Connect to Beet with any existing Beet connection.
     *
     * @param Bool existing
     * @returns BeetConnection
     */
    async getAnyConnection(existing = true) {
        if (existing && this.appstore.length > 0) {
          let beetConnection
          try {
              beetConnection = this.getConnection(this.appstore[0]);
          } catch (err) {
              console.log(err)
          }

          if (beetConnection) {
            return beetConnection;
          }
        }

        return newConnection();
    }
}

export default BeetApp;

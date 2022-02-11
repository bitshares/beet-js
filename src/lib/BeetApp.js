import sha256 from "crypto-js/sha256.js";
import BeetConnection from "./BeetConnection.js";

class BeetApp {

    constructor(appName, browser, origin) {
        this.appName = appName;
        this.browser = browser;
        this.origin = origin;
        this.appHash = sha256(this.browser + ' ' + this.origin + ' ' + this.appName).toString();
    }

    /**
     * Return a new BeetConnection
     *
     * @param {string|null} chain
     * @param {string|null} identity
     * @returns BeetConnection
     */
    async newConnection (chain = null, identity = null) {
      let beetConnection = new BeetConnection(this.appName, this.appHash, this.browser, this.origin);
      try {
        identity
          ? await beetConnection.connect(identity)
          : await beetConnection.connect();
      } catch (error) {
        console.log(error);
        throw error;
      }

      let newIdentity;
      try {
        newIdentity = chain
          ? await beetConnection.link(chain)
          : await beetConnection.link();
      } catch (error) {
        console.log(error);
        throw error;
      }

      return {beet: beetConnection, id: newIdentity};
    }
}

export default BeetApp;

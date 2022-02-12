import BeetApp from './lib/BeetApp.js';
import {allowFallback as _allowFallback, getWebSocketConnection} from './lib/socket.js';

const allowedChains = ["ANY", "BTS", "BNB_TEST", "STEEM", "BTC"];

class BeetJS {

    /**
     * Gets an instance of a beet connected application, and does the identity handling for the requested chain.
     *
     * @param {String} appName
     * @param {String} browser (User browser)
     * @param {String} origin (website url)
     * @param {String} chain (Target blockchain)
     * @param {BeetApp} existingBeetApp (Provide stored beet app)
     * @param {boolean} forceToChoose (Trigger account prompt in Beet)
     * @returns {Object} beet instance & requested chain connection
     */
    async get(appName, browser, origin, chain, existingBeetApp = null, identity = null) {
        if (!chain || !chain in allowedChains) {
          throw "Unable to establish a chain connection without target chain."
        }

        let returnValue = {
            beet: existingBeetApp
                  ? existingBeetApp
                  : new BeetApp(appName, browser, origin)
        };

        let connection;
        try {
          connection = await returnValue.beet.newConnection(chain, identity);
        } catch (error) {
          console.log(error);
          throw error;
        }

        returnValue[chain] = connection.beet;
        returnValue.newIdentity = connection.id;

        return returnValue;
    }

    /**
     * Pings Beet by hecking the version
     *
     * @returns {Promise} Resolves to the installed version of Beet
     */
    ping() {
        return new Promise((resolve, reject) => {
            getWebSocketConnection(
                function (event, socket) {
                    socket.send('{"type" : "version"}');
                },
                function (event, socket) {
                    let msg = JSON.parse(event.data);
                    if (msg.type == "version") {
                        resolve(msg.result);
                    } else {
                        reject(false);
                    }
                    socket.close();
                }
            );
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

}

class Holder {
    constructor(_companion) {
        this.beet = _companion;
    }
}

let holder = new Holder(new BeetJS());

export default holder;

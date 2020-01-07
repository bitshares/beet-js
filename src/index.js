import BeetApp from "./lib/BeetApp";
import {allowFallback as _allowFallback, getWebSocketConnection} from "./lib/socket";


class BeetJS {

    constructor() {
        this._beetAppInstances = {};
    }

    allowLocalhostFallback() {
        _allowFallback();
    }

    /**
     * Gets a plain instance of a beet connected application, user can handle
     * connections and identities as required.
     *
     * @param String appName The name of the application that wants to connect to beet
     * @returns Returns the beet instance for this application,
     */
    async getApp(appName) {
        if (this._beetAppInstances[appName]) {
            return this._beetAppInstances[appName];
        } else {
            let appInstance = new BeetApp(appName);
            await appInstance.init();
            this._beetAppInstances[appName] = appInstance;
            return this._beetAppInstances[appName];
        }
    }
    /**
     * Gets an instance of a beet connected application, and does the identity
     * handling for the requested chains.
     *
     * @param String appName The name of the application that wants to connect
     *                       to beet
     * @param String or List chainSelector A string, or list of strings giving
     *                       the chains the app wants an identity of
     * @param boolean forceToChoose [false] Always ask on beet to choose an account
     * @returns Returns a dict with following keys: 'beet' contains the beet instance for this application,
     *           and one key for each entry in chainSelector, which contains the beet connection for that identity
     */
    async get(appName, chainSelector, forceToChoose = false) {
        let _beetConnectedApp = null;
        if (this._beetAppInstances[appName]) {
            _beetConnectedApp = this._beetAppInstances[appName];
        } else {
            let appInstance = new BeetApp(appName);
            await appInstance.init();
            this._beetAppInstances[appName] = appInstance;
            _beetConnectedApp = this._beetAppInstances[appName];
        }

        if (typeof chainSelector == "string") {
            chainSelector = [chainSelector]
        }
        if (typeof chainSelector !== "object" && chainSelector.length > 0 && typeof chainSelector[0] == "string") {
            throw "chainSelector must be null, a string or list of strings"
        }

        let returnValue = {
            beet: _beetConnectedApp
        };
        for (let idx in chainSelector) {
            let chain = chainSelector[idx];
            if (chain == 'ANY') {
                returnValue[chain] = await _beetConnectedApp.getAnyConnection(!forceToChoose);
            } else {
                returnValue[chain] = await _beetConnectedApp.getChainConnection(chain, !forceToChoose);
            }
        }
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
if (typeof window !== 'undefined') window.beet = holder.beet;

export default holder;

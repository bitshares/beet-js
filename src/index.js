import Socket from 'simple-websocket';
import sha256 from "crypto-js/sha256.js";
import BeetConnection from "./lib/BeetConnection.js";
const allowedChains = ["ANY", "BTS", "BNB_TEST", "STEEM", "BTC"];

/**
 * Gets an instance of a beet connected application, and does the identity handling for the requested chain.
 *
 * @param {String} appName
 * @param {String} browser (User browser)
 * @param {String} origin (website url)
 * @param {String} chain (Target blockchain)
 * @param {BeetConnection} existingBeetConnection (Provide stored connection)
 * @param {boolean} forceToChoose (Trigger account prompt in Beet)
 * @returns {Object} beet instance & requested chain connection
*/
export const beet = async function (
  appName,
  browser,
  origin,
  chain,
  existingBeetConnection = null,
  identity = null
) {
  if (!chain || !chain in allowedChains) {
    throw "Unable to establish a chain connection without target chain."
  }

  let appHash = sha256(browser + ' ' + origin + ' ' + appName).toString();

  let beetConnection = existingBeetConnection
                      ? existingBeetConnection
                      : new BeetConnection(appName, appHash, browser, origin);
  let isReady;
  try {
    isReady = identity
      ? await beetConnection.connect(identity)
      : await beetConnection.connect();
  } catch (error) {
    console.log(error);
    //beetConnection.disconnect();
    return;
  }

  if (!beetConnection.socket || !beetConnection.connected) {
    console.log(`connected: ${beetConnection.connected} socket: ${beetConnection.socket ? true : false}`);
    return;
  }

  let newIdentity;
  try {
    newIdentity = chain
      ? await beetConnection.link(chain)
      : await beetConnection.link();
  } catch (error) {
    console.log(error);
    return;
  }

  let getContents = {newIdentity: newIdentity};
  getContents[chain] = beetConnection;

  return getContents;
}

/**
 * Checks for a Beet web socket response
 *
 * @returns {boolean} Resolves to true (if installed) and false (not installed)
*/
export const checkBeet = async function () {
  return new Promise((resolve, reject) => {
    let socket = new Socket('ws://localhost:60555');

    socket.on('error', function (error) {
      console.log("Couldn't connect to Beet")
      socket.destroy();
      return resolve(false);
    })

    socket.on('connect', () => {
      // socket is connected!
      console.log("Connected!");
      socket.destroy();
      return resolve(true);
    })
  });
}

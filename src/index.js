import sha256 from "crypto-js/sha256.js";
import BeetConnection from "./lib/BeetConnection.js";
const allowedChains = ["ANY", "BTS", "BNB_TEST", "STEEM", "BTC"];
import { io } from "socket.io-client";

let httpPort = 60555;
let httpsPort = 60554;

/**
 * Gets an instance of a beet connected application, and does the identity handling for the requested chain.
 *
 * @param {String} appName
 * @param {String} browser (User browser)
 * @param {String} origin (website url)
 * @param {String} chain (Target blockchain)
 * @param {BeetConnection} existingBeetConnection (Provide stored connection)
 * @param {Object} identity
 * @returns {BeetConnection}
*/
export const connect = async function (
  appName,
  browser,
  origin,
  existingBeetConnection = null,
  identity = null
) {
  return new Promise(async (resolve, reject) => {
    let appHash;
    try {
      appHash = sha256(browser + ' ' + origin + ' ' + appName).toString();
    } catch (error) {
      console.log(error);
      return;
    }
  
    let beetConnection;
    try {
      beetConnection = existingBeetConnection
                          ? existingBeetConnection // attempt to reconnect
                          : new BeetConnection(appName, appHash, browser, origin, identity);
    } catch (error) {
      console.log(error);
      return;
    }

    let ssl;
    try {
      ssl = await checkBeet(true, httpsPort);
    } catch (error) {
      console.log(`checkBeet ssl: ${error}`);
    }

    let http;
    try {
      http = await checkBeet(false, httpPort);
    } catch (error) {
      console.log(`checkBeet http: ${error}`);
    }

    if (!ssl && !http) {
      console.log("Beet is offline, launch it then try again.");
      return reject("Beet is offline");
    }

    let authToken;
    try {
      authToken = await beetConnection.connect(
        identity,
        ssl ? true : false,
        ssl ? httpsPort : httpPort
      )
    } catch (error) {
      console.log(`${ssl ? 'https' : 'http'} connection attempt error: ${error}`);
    }

    if (!authToken) { // fallback to http
      try {
        authToken = await beetConnection.connect(identity, false, httpPort)
      } catch (error) {
        console.log(`http connection attempt error: ${error}`);
      }
    }

    try {
      await beetConnection.setAuth(authToken);
    } catch (error) {
      console.log(error);
      return;
    }

    if (beetConnection.connected) {
      console.log(`Connected to Beet`)
    }

    return resolve(beetConnection);
  });


}

/**
 * Gets an instance of a beet connected application, and does the identity handling for the requested chain.
 *
 * @param {String} chain (Target blockchain)
 * @param {BeetConnection} beetConnection (Provide stored connection)
 * @returns {Object}
*/
export const link = async function (chain = 'ANY', beetConnection) {
  if (!chain || !chain in allowedChains) {
    console.log("Unable to establish a chain connection without target chain.");
    return;
  }

  if (!beetConnection) {
    console.log("No beet connection for link request");
    return;
  }

  let linkage;
  try {
    linkage = await beetConnection.link(chain);
  } catch (error) {
    console.log(`Unable to link: ${error}`);
    return;
  }
}

/**
 * Checks for a Beet web socket response
 * @param {boolean} enableSSL
 * @returns {boolean} Resolves to true (if installed) and false (not installed)
*/
export const checkBeet = async function (enableSSL = true, port = 60554) {
  return new Promise((resolve, reject) => {
    let socket;
    try {
      socket = enableSSL
                ? io(`wss://local.get-beet.io:${port}/`, {transports: ['websocket'], rejectUnauthorized: false})
                : io(`ws://localhost:${port}`);
    } catch (error) {
      console.log(error);
      resolve(false);
    }

    socket.on("connect_error", (error) => {
      socket.disconnect();
      resolve(false);
    });
    
    socket.emit("ping", 'pong');

    socket.on("pong", (response) => {
      resolve(response);
    });
  });
}

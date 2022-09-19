import { connect, link } from '../../../src/index.js';
import { readData, storeData } from '../../lib/localDB.js'
import { injection } from '../../lib/injection.js'

let run = async function () {
  let scriptName = "InjectExample.013";
  
  let identity = await readData(scriptName);
  let connection;
  try {
    connection = await connect(
      scriptName,
      "Browser type",
      "localhost",
      null,
      identity ?? null
    );
  } catch (error) {
    console.error(error);
    return;
  }

  let linkAttempt;
  try {
    linkAttempt = await link("BTS", connection);
  } catch (error) {
    console.error(error)
    return;
  }

  if (connection.secret) {
    injection(
      connection,
      "wss://node.xbts.io/ws",
      "asset_update_feed_producers",
      {
        issuer: "",
        asset_to_update: "",
        new_feed_producers: [""]
      }
    );
  }
}

run();



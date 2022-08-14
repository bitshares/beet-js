import { connect, link } from '../../src/index.js';
import { readData, storeData } from './localDB.js'

async function getAccount(connection) {
  let requestedAccount;
  try {
    requestedAccount = await connection.requestAccount();
  } catch (error) {
    return;
  }
  console.log(requestedAccount)
}

let run = async function () {
  let appName = "getAccountExample";
  let identity = await readData(appName);

  console.log({identity})

  let connection;
  try {
    connection = await connect(
      appName,
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
    console.log(connection)
    getAccount(connection);
    storeData(connection.identity)
  }
}

run();



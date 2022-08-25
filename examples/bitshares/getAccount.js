import { connect, link } from '../../src/index.js';
import { readData, storeData } from '../lib/localDB.js'

async function getAccount(connection) {
  let requestedAccount;
  try {
    requestedAccount = await connection.requestAccount();
  } catch (error) {
    return;
  }
  console.log(requestedAccount)

  if (connection.identity) {
    storeData(connection.identity)
  }
}

let run = async function () {
  let identity = await readData("getAccountExample");

  let connection;
  try {
    connection = await connect(
      "getAccountExample",
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

  if (!connection.secret) {
    return;
  }

  await getAccount(connection);
}

run();



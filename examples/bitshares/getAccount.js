import { connect, link } from '../../src/index.js';

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
  let connection;
  try {
    connection = await connect(
      "App name",
      "Browser type",
      "localhost"
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
    getAccount(connection);
  }
}

run();



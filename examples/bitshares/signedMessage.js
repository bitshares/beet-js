import { connect, link } from '../../src/index.js';
import { readData, storeData } from '../lib/localDB.js'

let run = async function () {
  let identity = await readData("signedMessageExample");

  let connection;
  try {
    connection = await connect(
      "signedMessageExample",
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

  if (!connection.identity) {
    console.log("Link rejected");
    return;
  }

  let signedMessaged;
  if (connection.secret) {
    console.log('Successfully linked. Signing message.');
    try {
      signedMessaged = await connection.signMessage('example message to sign');
    } catch (error) {
      console.log(error);
      return;
    }
    console.log(signedMessaged)
  }

  console.log("Now verifying the above signed message")
  
  let verifiedMessage;
  if (signedMessaged) {
    try {
      verifiedMessage = await connection.verifyMessage(JSON.stringify(signedMessaged));
    } catch (error) {
      console.log(error);
      return;
    }
    console.log(verifiedMessage ? 'Valid message signature' : 'Invalid message signature')
  }

  storeData(connection.identity)
}

run();

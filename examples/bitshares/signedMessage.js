import { connect, link } from '../../src/index.js';

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

  if (!connection.identity) {
    console.log("Link rejected");
    return;
  }

  if (connection.secret) {
    console.log('Successfully linked. Signing message.');
    let signedMessaged;
    try {
      signedMessaged = await connection.signMessage('example message to sign');
    } catch (error) {
      console.log(error);
      return;
    }
    console.log(signedMessaged)
  }
}

run();

/**
 * @param {BeetConnection} connection
 * @param {string} messageToSign
 */
async function signMessage(connection, messageToSign) {
  let signedMessaged;
  try {
    signedMessaged = await connection.signMessage(messageToSign);
  } catch (error) {
    return;
  }
  console.log(signedMessaged)
}


let run = async function () {
  let connection;
  try {
    connection = await connect(
      "application name",
      "Browser type forwarded by app",
      "application url",
      null,
      null
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
    console.log('Successfully linked')
    signMessage(connection, 'example message to sign')
  }
}

run();

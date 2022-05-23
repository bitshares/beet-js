/**
 * @param {BeetConnection} connection
 * @param {string} messageToSign
 */
async function signMessage() {
  let signedMessaged;
  try {
    signedMessaged = await connection.signMessage(messageToSign);
  } catch (error) {
    return;
  }
  console.log(signedMessaged)
}

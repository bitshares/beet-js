/**
 * @param {BeetConnection} connection
 * @param {string} voteTarget
 */
async function vote() {
  let voteResult;
  try {
    voteResult = await connection.voteFor({id: voteTarget});
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(voteResult);
}

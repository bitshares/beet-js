/**
 * @param {BeetConnection} connection
 * @param {string} voteTarget
 */
async function vote(connection, voteTarget) {
  let voteResult;
  try {
    voteResult = await connection.voteFor({id: voteTarget});
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(voteResult);
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
    vote(connection, 'vote_target'); // replace vote_target with valid vote id
  }
}

run();
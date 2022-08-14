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

  if (connection.secret) {
    console.log('Successfully linked, voting...')

    let voteResult;
    try {
      voteResult = await connection.voteFor({id: '1.14.0'});
    } catch (error) {
      console.log(error);
      return;
    }
  
    console.log(voteResult);
  }
}

run();
import { connect, link } from '../../src/index.js';
import { readData, storeData } from '../lib/localDB.js'

let run = async function () {
  let identity = await readData(appName);

  let connection;
  try {
    connection = await connect(
      "VoteExample",
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
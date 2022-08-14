import {connect, link} from '../src/index.js';



let linkToBeet = async function () {
  let connection;
  try {
    connection = await connect(
      "LinkExample",
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

  console.log('Successfully linked')
  //console.log(connection.identity);
  console.log(connection);
}

linkToBeet();
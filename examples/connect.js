import { connect } from 'beet-js';

let attemptConnection = async function () {
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
    console.error(error)
  }
}

attemptConnection();

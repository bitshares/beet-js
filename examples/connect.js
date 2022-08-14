import {connect} from '../src/index.js';

(async () => {
  let connection;
  try {
    connection = await connect(
      "ConnectExample",
      "Browser type",
      "localhost"
    );
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(connection)
})();


import {connect} from '../src/index.js';

(async () => {
  let connection;
  try {
    connection = await connect(
      "App name",
      "Browser type",
      "localhost"
    );
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(connection)
})();


let linkToBeet = async function () {
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
    console.log(connection.identity);
  }
}

linkToBeet();
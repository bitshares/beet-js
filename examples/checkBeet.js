import {checkBeet} from '../src/index.js';

(async () => {
  let httpsEnabled;
  try {
    httpsEnabled = await checkBeet(true);
  } catch (error) {
    console.log(error);
  }

  let httpEnabled;
  try {
    httpEnabled = await checkBeet(false);
  } catch (error) {
    return;
  }

  console.log(`https: ${httpsEnabled ? true : false} http: ${httpEnabled ? true : false}`)

})();


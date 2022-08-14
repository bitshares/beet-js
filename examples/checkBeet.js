import {checkBeet} from '../src/index.js';

(async () => {
  let httpsEnabled;
  try {
    httpsEnabled = await checkBeet(true, 60554);
  } catch (error) {
    console.log(error);
  }

  let httpEnabled;
  try {
    httpEnabled = await checkBeet(false, 60555);
  } catch (error) {
    return;
  }

  console.log(`https: ${httpsEnabled ? true : false} http: ${httpEnabled ? true : false}`)

})();


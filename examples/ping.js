import { checkBeet } from 'beet-js';

let ping = async function () {
    let checkedBeet;
    try {
      checkedBeet = await checkBeet();
    } catch (error) {
      console.error(error)
    }
    console.log(checkedBeet);
  }

ping();

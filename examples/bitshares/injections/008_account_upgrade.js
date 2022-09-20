import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.008", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_upgrade", // operation name
    {}
  );
}

/*
run();
*/


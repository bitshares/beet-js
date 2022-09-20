import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.005", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_create", // operation name
    {}
  );
}

/*
run();
*/


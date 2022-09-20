import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.007", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_whitelist", // operation name
    {}
  );
}

/*
run();
*/


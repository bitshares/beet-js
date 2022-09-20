import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.026", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_update", // operation name
    {}
  );
}

/*
run();
*/


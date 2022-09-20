import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.028", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_delete", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.027", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_claim", // operation name
    {}
  );
}

/*
run();
*/


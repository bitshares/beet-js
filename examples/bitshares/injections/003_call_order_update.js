import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.003", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "call_order_update", // operation name
    {}
  );
}

/*
run();
*/


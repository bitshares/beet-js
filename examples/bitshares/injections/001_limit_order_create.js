import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.001", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "limit_order_create", // operation name
    {}
  );
}

/*
run();
*/


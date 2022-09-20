import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.004", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "fill_order", // operation name
    {}
  );
}

/*
run();
*/


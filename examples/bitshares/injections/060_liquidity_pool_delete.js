import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.060", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_delete", // operation name
    {}
  );
}

/*
run();
*/


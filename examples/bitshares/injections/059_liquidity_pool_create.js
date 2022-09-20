import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.059", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_create", // operation name
    {}
  );
}

/*
run();
*/


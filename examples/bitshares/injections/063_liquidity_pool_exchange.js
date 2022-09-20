import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.063", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_exchange", // operation name
    {}
  );
}

/*
run();
*/


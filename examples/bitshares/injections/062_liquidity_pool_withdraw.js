import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.062", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_withdraw", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.012", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_update_bitasset", // operation name
    {}
  );
}

/*
run();
*/


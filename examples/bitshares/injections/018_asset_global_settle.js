import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.018", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_global_settle", // operation name
    {}
  );
}

/*
run();
*/


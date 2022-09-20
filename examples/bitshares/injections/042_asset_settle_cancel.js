import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.042", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_settle_cancel", // operation name
    {}
  );
}

/*
run();
*/


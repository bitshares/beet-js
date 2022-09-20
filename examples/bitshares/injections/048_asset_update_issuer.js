import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.048", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_update_issuer", // operation name
    {}
  );
}

/*
run();
*/


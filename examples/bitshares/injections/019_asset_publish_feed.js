import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.019", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_publish_feed", // operation name
    {}
  );
}

/*
run();
*/


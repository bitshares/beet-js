import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.011", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "update_asset", // operation name
    {}
  );
}

/*
run();
*/


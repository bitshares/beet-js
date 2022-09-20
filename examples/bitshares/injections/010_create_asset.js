import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.010", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "create_asset", // operation name
    {}
  );
}

/*
run();
*/


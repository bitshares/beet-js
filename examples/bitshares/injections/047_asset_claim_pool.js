import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.047", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_claim_pool", // operation name
    {}
  );
}

/*
run();
*/


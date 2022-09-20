import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.043", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_claim_fees", // operation name
    {}
  );
}

/*
run();
*/


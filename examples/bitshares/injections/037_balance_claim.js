import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.037", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "balance_claim", // operation name
    {}
  );
}

/*
run();
*/


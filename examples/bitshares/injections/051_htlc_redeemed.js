import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.051", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_redeemed", // operation name
    {}
  );
}

/*
run();
*/


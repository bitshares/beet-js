import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.050", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_redeem", // operation name
    {}
  );
}

/*
run();
*/


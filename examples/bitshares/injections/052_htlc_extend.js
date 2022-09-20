import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.052", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_extend", // operation name
    {}
  );
}

/*
run();
*/


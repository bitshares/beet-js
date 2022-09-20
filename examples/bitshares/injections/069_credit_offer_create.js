import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.069", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_create", // operation name
    {}
  );
}

/*
run();
*/


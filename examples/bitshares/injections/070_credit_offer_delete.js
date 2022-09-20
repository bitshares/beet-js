import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.070", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_delete", // operation name
    {}
  );
}

/*
run();
*/


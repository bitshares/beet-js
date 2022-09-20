import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.072", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_accept", // operation name
    {}
  );
}

/*
run();
*/


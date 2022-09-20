import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.074", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_deal_expired", // operation name
    {}
  );
}

/*
run();
*/


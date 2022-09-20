import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.073", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_deal_repay", // operation name
    {}
  );
}

/*
run();
*/


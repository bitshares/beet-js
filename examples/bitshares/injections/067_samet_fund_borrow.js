import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.067", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "samet_fund_borrow", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.041", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "tranfer_from_blind", // operation name
    {}
  );
}

/*
run();
*/


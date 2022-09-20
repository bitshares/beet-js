import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.039", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "transfer_to_blind", // operation name
    {}
  );
}

/*
run();
*/


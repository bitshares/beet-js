import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.000", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "transfer", // operation name
    {}
  );
}

/*
run();
*/


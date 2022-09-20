import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.038", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "override_transfer", // operation name
    {}
  );
}

/*
run();
*/


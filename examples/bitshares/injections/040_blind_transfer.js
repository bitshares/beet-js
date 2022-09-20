import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.040", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "blind_transfer", // operation name
    {}
  );
}

/*
run();
*/


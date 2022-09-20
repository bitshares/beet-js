import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.036", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "assert", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.044", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "fba_distribute", // operation name
    {}
  );
}

/*
run();
*/


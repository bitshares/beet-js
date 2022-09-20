import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.046", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "execute_bid", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.034", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "worker_create", // operation name
    {}
  );
}

/*
run();
*/


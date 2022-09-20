import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.055", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "custom_authority_update", // operation name
    {}
  );
}

/*
run();
*/


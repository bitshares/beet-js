import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.054", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "custom_authority_create", // operation name
    {}
  );
}

/*
run();
*/


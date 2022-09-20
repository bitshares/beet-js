import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.032", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "vesting_balance_create", // operation name
    {}
  );
}

/*
run();
*/


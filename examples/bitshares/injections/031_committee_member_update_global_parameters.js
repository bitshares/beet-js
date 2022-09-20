import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.031", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "committee_member_update_global_parameters", // operation name
    {}
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.052", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_extend", // operation name
    {
      htlc_id: "1.16.x",
      update_issuer: "1.2.x",
      seconds_to_add: 600,
      extensions: []
    }
  );
}

run();

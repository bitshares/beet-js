import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.053", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_refund", // operation name
    {
      htlc_id: "1.x.x",
      to: "1.2.x"
    }
  );
}

/*
run();
*/


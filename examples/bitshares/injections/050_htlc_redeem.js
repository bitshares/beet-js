import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.050", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_redeem", // operation name
    {
      htlc_id: "1.16.x",
      redeemer: "1.2.x",
      preimage: "",
      extensions: []
    }
  );
}

run();

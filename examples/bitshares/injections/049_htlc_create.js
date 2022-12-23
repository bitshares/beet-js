import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.049", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_create", // operation name
    {
      from: "1.2.x",
      to: "1.2.x",
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      preimage_hash: "",
      preimage_size: 0,
      claim_period_seconds: 600,
      extensions: []
    }
  );
}

run();

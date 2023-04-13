import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.043", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_claim_fees", // operation name
    {
      issuer: "1.2.x",
      amount_to_claim: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.051", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "htlc_redeemed", // operation name
    {
      htlc_id: "1.x.x",
      from: "1.2.x",
      to: "1.2.x",
      amount: {
        amount: 1,
        asset_id: "1.3."
      }
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.045", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "bid_collateral", // operation name
    {
      bidder: "1.2.x",
      additional_collateral: {
        amount: 1,
        asset_id: "1.3.x"
      },
      debt_covered: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

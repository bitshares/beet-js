import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.072", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_accept", // operation name
    {
      borrower: "1.2.x",
      offer_id: "1.21.x",
      borrow_amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      collateral: {
        amount: 1,
        asset_id: "1.3.x"
      },
      max_fee_rate: 100,
      min_duration_seconds: 6000,
      extensions: []
    }
  );
}

run();

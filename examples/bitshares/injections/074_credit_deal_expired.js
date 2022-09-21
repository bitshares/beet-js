import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.074", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_deal_expired", // operation name
    {
      deal_id: "1.x.x",
      offer_id: "1.x.x",
      offer_owner: "1.2.x",
      borrower: "1.2.x",
      unpaid_amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      collateral: {
        amount: 1,
        asset_id: "1.3.x"
      },
      fee_rate: 1
    }
  );
}

/*
run();
*/


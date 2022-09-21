import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.073", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_deal_repay", // operation name
    {
      account: "1.2.x",
      deal_id: "1.22.x",
      repay_amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      credit_fee: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

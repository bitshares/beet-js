import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.068", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "samet_fund_repay", // operation name
    {
      account: "1.2.x",
      fund_id: "1.x.x",
      repay_amount: {
        amount: 1,
        asset_id: "1.3."
      },
      fund_fee: {
        amount: 1,
        asset_id: "1.3."
      },
      extensions: []
    }
  );
}

/*
run();
*/


import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.066", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "samet_fund_update", // operation name
    {
      owner_account: "1.2.x",
      fund_id: "1.20.x",
      delta_amount: { // optional
        amount: 1,
        asset_id: "1.3.x"
      },
      new_fee_rate: 2, // optional
      extensions: []
    }
  );
}

run();

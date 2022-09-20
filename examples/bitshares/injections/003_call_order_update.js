import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.003", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "call_order_update", // operation name
    {
      funding_account: "1.2.",
      delta_collateral: {
        amount: 1,
        asset_id: "1.3."
      },
      delta_debt: {
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


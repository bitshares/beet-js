import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.004", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "fill_order", // operation name
    {
      order_id: "",
      account_id: "1.2.",
      pays: {
        amount: 1,
        asset_id: "1.3."
      },
      receives: {
        amount: 1,
        asset_id: "1.3."
      }
    }
  );
}


run();
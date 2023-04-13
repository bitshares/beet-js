import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.002", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "limit_order_cancel", // operation name
    {
      fee_paying_account: "1.2.x",
      order: "",
      extensions: []
    }
  );
}

run();
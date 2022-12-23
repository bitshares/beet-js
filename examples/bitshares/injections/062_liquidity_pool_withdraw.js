import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.062", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_withdraw", // operation name
    {
      account: "1.2.x",
      pool: "1.19.x",
      share_amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

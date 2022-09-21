import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.063", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_exchange", // operation name
    {
      account: "1.2.x",
      pool: "1.19.x",
      amount_to_sell: {
        amount: 1,
        asset_id: "1.3.x"
      },
      min_to_receive: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

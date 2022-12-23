import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.061", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_deposit", // operation name
    {
      account: "1.2.x",
      pool: "1.19.x",
      amount_a: {
        amount: 1,
        asset_id: "1.3.x"
      },
      amount_b: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

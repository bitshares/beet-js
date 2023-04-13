import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.059", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "liquidity_pool_create", // operation name
    {
      account: "1.2.x",
      asset_a: "1.3.x",
      asset_b: "1.3.x",
      share_asset: "1.3.x",
      taker_fee_percent: 1,
      withdrawal_fee_percent: 1,
      extensions: []
    }
  );
}

run();

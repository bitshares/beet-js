import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.012", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_update_bitasset", // operation name
    {
      issuer: "1.2.x",
      asset_to_update: "1.3.x",
      new_options: {
        feed_lifetime_sec: 100000,
        minimum_feeds: 1,
        force_settlement_delay_sec: 60,
        force_settlement_offset_percent: 0,
        maximum_force_settlement_volume: 5,
        short_backing_asset: "1.3.x",
        extensions: []
      },
      extensions: []
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.011", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_update", // operation name
    {
      issuer: "1.2.x",
      asset_to_update: "1.3.x",
      new_issuer: null,
      new_options: {
        max_supply: 1,
        market_fee_percent: 0,
        max_market_fee: 0,
        issuer_permissions: 0,
        flags: 0,
        core_exchange_rate: {
          base: {
            amount: 1,
            asset_id: "1.3.x"
        },
          quote: {
            amount: 1,
            asset_id: "1.3.x"
        }
        },
        whitelist_authorities: [],
        blacklist_authorities: [],
        whitelist_markets: [],
        blacklist_markets: [],
        description: "",
        extensions: []
      },
      extensions: []
    }
  );
}

run();

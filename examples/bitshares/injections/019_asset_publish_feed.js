import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.019", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_publish_feed", // operation name
    {
      publisher: "1.2.",
      asset_id: "1.3.",
      feed: {
        settlement_price: {
          base: {
            amount: 1,
            asset_id: "1.3."
          },
          quote: {
            amount: 1,
            asset_id: "1.3."
          }
        },
        maintenance_collateral_ratio: 100,
        maximum_short_squeeze_ratio: 100,
        core_exchange_rate: {
          base: {
            amount: 1,
            asset_id: "1.3."
          },
          quote: {
            amount: 1,
            asset_id: "1.3."
          }
      }
    },
      extensions: set(future_extensions)
    }
  );
}

run();

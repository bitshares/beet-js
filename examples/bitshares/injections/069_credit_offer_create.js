import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.069", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_create", // operation name
    {
      owner_account: "1.2.x",
      asset_type: "1.3.x",
      balance: 1,
      fee_rate: 1,
      max_duration_seconds: 60000,
      min_deal_amount: 1,
      enabled: true,
      auto_disable_time: 6000,
      acceptable_collateral: [
        [
          "1.3.0", // matching quote asset_id
          {
            base: {
              amount: 1,
              asset_id: "1.3.x"
            },
            quote: {
              amount: 1,
              asset_id: "1.3.0"
            }
          }
        ],
        [
          "1.3.1", // matching quote asset_id
          {
            base: {
              amount: 1,
              asset_id: "1.3.x"
            },
            quote: {
              amount: 1,
              asset_id: "1.3.1"
            }
          }
        ]
      ],
      acceptable_borrowers: [{
        "1.2.x": 1
      }],
      extensions: []
    }
  );
}

run();

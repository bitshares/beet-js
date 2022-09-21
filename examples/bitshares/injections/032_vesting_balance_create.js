import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.032", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "vesting_balance_create", // operation name
    {
      creator: "1.2.",
      owner: "1.2.",
      amount: {
        amount: 1,
        asset_id: "1.3."
      },
      policy: [ // TODO: DEBUG
        {
          "linear_vesting_policy_initializer": {
            begin_timestamp: 1663765941,
            vesting_cliff_seconds: 60000,
            vesting_duration_seconds: 60000
          }
        },
        {
          "cdd_vesting_policy_initializer ": {
            start_claim: 1663765941,
            vesting_seconds: 60000
          }
        }
      ]
    }
  );
}

run();

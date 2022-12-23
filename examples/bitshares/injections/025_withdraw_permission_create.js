import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.025", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_create", // operation name
    {
      withdraw_from_account: "1.2.x",
      authorized_account: "1.2.x",
      withdrawal_limit: {
        amount: 1,
        asset_id: "1.3.x"
      },
      withdrawal_period_sec: 60000,
      periods_until_expiration: 60000,
      period_start_time: 1663764871
    }
  );
}

run();

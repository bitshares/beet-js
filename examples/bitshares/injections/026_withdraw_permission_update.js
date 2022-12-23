import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.026", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_update", // operation name
    {
      withdraw_from_account: "1.2.x",
      authorized_account: "1.2.x",
      permission_to_update: "1.12.x",
      withdrawal_limit: {
        amount: 1,
        asset_id: "1.3.x"
      },
      withdrawal_period_sec: uint32,
      period_start_time: time_point_sec,
      periods_until_expiration: uint32
    }
  );
}

run();

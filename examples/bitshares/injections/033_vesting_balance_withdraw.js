import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.033", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "vesting_balance_withdraw", // operation name
    {
      vesting_balance: "1.13.x",
      owner: "1.2.x",
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      }
    }
  );
}

run();

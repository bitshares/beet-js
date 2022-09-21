import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.016", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_fund_fee_pool", // operation name
    {
      from_account: "1.2.x",
      asset_id: "1.2.x",
      amount: 1,
      extensions: []
    }
  );
}

run();

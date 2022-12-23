import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.064", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "samet_fund_create", // operation name
    {
      owner_account: "1.2.x",
      asset_type: "1.3.x",
      balance: 1,
      fee_rate: 1,
      extensions: []
    }
  );
}

run();

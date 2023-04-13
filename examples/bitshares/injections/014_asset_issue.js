import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.014", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_issue", // operation name
    {
      issuer: "1.2.x",
      asset_to_issue: {
        amount: 1,
        asset_id: "1.3.x"
      },
      memo: "", //optional
      issue_to_account: "1.2.x",
      extensions: []
    }
  );
}

run();

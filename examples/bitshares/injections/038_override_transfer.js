import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.038", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "override_transfer", // operation name
    {
      issuer: "1.2.x",
      from: "1.2.x",
      to: "1.2.x",
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      memo: "",
      extensions: []
    }
  );
}

run();

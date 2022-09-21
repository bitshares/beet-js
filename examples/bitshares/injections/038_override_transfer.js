import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.038", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "override_transfer", // operation name
    {
      issuer: "1.2.",
      from: "1.2.",
      to: "1.2.",
      amount: {
        amount: 1,
        asset_id: "1.3."
      },
      memo: "",
      extensions: []
    }
  );
}

/*
run();
*/


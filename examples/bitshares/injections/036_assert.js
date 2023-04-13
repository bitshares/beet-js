import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.036", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "assert", // operation name
    {
      fee_paying_account: "1.2.x",
      predicates: [
        [0, {"account_id":"1.2.x","name":"abc"}],
        [1, {"asset_id":"1.3.x","symbol":"ABC"}]
      ],
      required_auths: ["1.2.x"],
      extensions: []
    }
  );
}

run();

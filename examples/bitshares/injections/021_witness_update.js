import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.021", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "witness_update", // operation name
    {
      witness: "1.x.x",
      witness_account: "1.2.",
      new_url: "",
      new_signing_key: ""
    }
  );
}

/*
run();
*/


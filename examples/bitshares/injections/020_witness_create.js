import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.020", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "witness_create", // operation name
    {
      witness_account: "1.2.x",
      url: "",
      block_signing_key: ""
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.009", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_transfer", // operation name
    {
      account_id: "1.2.",
      new_owner: "1.2.",
      extensions: []
    }
  );
}

run();

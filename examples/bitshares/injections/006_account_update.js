import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.006", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_update", // operation name
    {
      account: "1.2.x",
      owner: {},
      active: {},
      new_options: {},
      extensions: []
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.007", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_whitelist", // operation name
    {
      authorizing_account: "1.2.",
      account_to_list: "1.2.",
      new_listing: 0,
      extensions: []
    }
  );
}

/*
run();
*/


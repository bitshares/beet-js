import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.008", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "account_upgrade", // operation name
    {
      account_to_upgrade: "1.2.x",
      upgrade_to_lifetime_member: true,
      extensions: []
    }
  );
}

run();

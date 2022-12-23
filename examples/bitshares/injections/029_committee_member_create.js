import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.029", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "committee_member_create", // operation name
    {
      committee_member_account: "1.2.x",
      url: ""
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.028", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "withdraw_permission_delete", // operation name
    {
      withdraw_from_account: "1.2.x",
      authorized_account: "1.2.x",
      withdrawal_permission: "1.12.x"
    }
  );
}

run();

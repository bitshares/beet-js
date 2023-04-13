import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.070", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "credit_offer_delete", // operation name
    {
      owner_account: "1.2.x",
      offer_id: "1.21.x",
      extensions: []
    }
  );
}

run();

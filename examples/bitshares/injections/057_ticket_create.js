import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.057", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "ticket_create", // operation name
    {
      account: "1.2.x",
      target_type: 1,
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

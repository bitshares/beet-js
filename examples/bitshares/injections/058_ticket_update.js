import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.058", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "ticket_update", // operation name
    {
      ticket: "1.18.x",
      account: "1.2.x",
      target_type: 1,
      amount_for_new_target: {
        amount: 1,
        asset_id: "1.3.x"
      },
      extensions: []
    }
  );
}

run();

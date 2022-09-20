import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.015", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_reserve", // operation name
    {
      payer: "1.2.",
      amount_to_reserve: {
        amount: 1,
        asset_id: "1.3."
      },
      extensions: []
    }
  );
}

/*
run();
*/


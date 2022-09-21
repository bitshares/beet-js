import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.048", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_update_issuer", // operation name
    {
      issuer: "1.2.x",
      asset_to_update: "1.3.x",
      new_issuer: "1.2.x",
      extensions: []
    }
  );
}

run();

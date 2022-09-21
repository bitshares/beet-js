import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.018", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "asset_global_settle", // operation name
    {
      issuer: "1.2.x",
      asset_to_settle: "1.3.x",
      settle_price: {
        base: {
          amount: 1,
          asset_id: "1.3.x"
        },
        quote: {
          amount: 1,
          asset_id: "1.3.x"
        }
    },
      extensions: []
    }
  );
}

run();

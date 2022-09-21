import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.046", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "execute_bid", // operation name
    {
      bidder: "1.2.x",
      debt: {
        amount: 1,
        asset_id: "1.3.x"
      },
      collateral: {
        amount: 1,
        asset_id: "1.3.x"
      }
    }
  );
}

run();

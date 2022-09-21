import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.022", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "proposal_create", // operation name
    {
      fee_paying_account: "1.2.x",
      expiration_time: 1763764722,
      proposed_ops: [{}],
      review_period_seconds: 60000,
      extensions: []
    }
  );
}

run();

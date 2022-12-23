import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.024", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "proposal_delete", // operation name
    {
      fee_paying_account: "1.2.x",
      using_owner_authority: true,
      proposal: "1.10.x",
      extensions: []
    }
  );
}

run();

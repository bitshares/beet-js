import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.023", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "proposal_update", // operation name
    {
      fee_paying_account: "1.2.",
      proposal: "1.x.x",
      active_approvals_to_add: ["1.2."],
      active_approvals_to_remove: ["1.2."],
      owner_approvals_to_add: ["1.2."],
      owner_approvals_to_remove: ["1.2."],
      key_approvals_to_add: [""],
      key_approvals_to_remove: [""],
      extensions: []
    }
  );
}

run();

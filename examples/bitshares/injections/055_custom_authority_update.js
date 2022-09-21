import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.055", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "custom_authority_update", // operation name
    {
      account: "1.2.x",
      authority_to_update: "2.14.x",
      new_enabled: true,
      new_valid_from: 1663771380,
      new_valid_to: 1763771380,
      new_auth: { // optional
        weight_threshold: 1,
        account_auths: [{"1.2.x": 1}],
        key_auths: [{"": 1}],
        address_auths: [{"": 1}]
      },
      restrictions_to_remove: [1],
      restrictions_to_add: [{
        member_index: 2,
        restriction_type: 2,
        argument: false
      }],
      extensions: []
    }
  );
}

run();

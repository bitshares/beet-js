import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.054", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "custom_authority_create", // operation name
    {
      account: "1.2.x",
      enabled: false,
      valid_from: 1663771251,
      valid_to: 1763771251,
      operation_type: 1,
      auth: {
        weight_threshold: 1,
        account_auths: [{"1.2.x": 1}],
        key_auths: [{"": 1}],
        address_auths: [{"": 1}]
      },
      restrictions: [{
          member_index: 1,
          restriction_type: 1,
          argument: false
      }],
      extensions: []
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.036", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "assert", // operation name
    {
      fee_paying_account: "1.2.",
      predicates: [ // TODO: DEBUG
        {
          "account_name_eq_lit_predicate": {
            account_id: "1.2.",
            name: ""
          }
        }
      ],
      required_auths: ["1.2."],
      extensions: []
    }
  );
}

run();

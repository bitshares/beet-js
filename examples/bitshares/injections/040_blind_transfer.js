import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.040", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "blind_transfer", // operation name
    {
      inputs: [{
        commitment: "",
        owner: {
          weight_threshold: 1,
          account_auths: [{"1.2.x": 1}],
          key_auths: [{"": 1}],
          address_auths: [{"": 1}]
        }
      }],
      outputs: [{
        commitment: "",
        range_proof: "",
        owner: {
          weight_threshold: 1,
          account_auths: [{"1.2.x": 1}],
          key_auths: [{"": 1}],
          address_auths: [{"": 1}]
        },
        stealth_memo: { // optional
          one_time_key: "",
          to: "",
          encrypted_memo: ""
        }
      }]
    }
  );
}

run();

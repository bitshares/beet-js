import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.039", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "transfer_to_blind", // operation name
    {
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      from: "1.2.x",
      blinding_factor: "",
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

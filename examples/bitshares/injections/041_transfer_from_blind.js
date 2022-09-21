import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.041", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "transfer_from_blind ", // operation name
    {
      amount: {
        amount: 1,
        asset_id: "1.3.x"
      },
      to: "1.2.x",
      blinding_factor: "",
      inputs: [{
        commitment: "",
        owner: {
          weight_threshold: 1,
          account_auths: [{"1.2.x": 1}],
          key_auths: [{"": 1}],
          address_auths: [{"": 1}]
        }
      }],
    }
  );
}

run();

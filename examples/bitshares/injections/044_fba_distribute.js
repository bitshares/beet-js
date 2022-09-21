import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.044", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "fba_distribute", // operation name
    {
      account_id: "1.2.x",
      fba_id: "2.16.x",
      amount: 1
    }
  );
}

run();

import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.034", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "worker_create", // operation name
    {
      owner: "1.2.",
      work_begin_date: 1663766042,
      work_end_date: 2663766042,
      daily_pay: 1,
      name: "",
      url: "",
      initializer: "burn_worker_initializer" // TODO: DEBUG
    }
  );
}

/*
run();
*/


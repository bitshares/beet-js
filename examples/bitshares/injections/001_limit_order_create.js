import { injection } from '../../lib/injection.js'

let run = async function () {

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth(); // for example, 2021
  currentDate.setMonth(currentMonth + 1);

  await injection(
    "InjectExample.001", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "limit_order_create", // operation name
    {
      seller: "1.2.x",
      amount_to_sell: {
        amount: 1,
        asset_id: "1.3.x"
      },
      min_to_receive: {
        amount: 1,
        asset_id: "1.3.x"
      },
      expiration: currentDate,
      fill_or_kill: true,
      extensions: []
    }
  );
}

run();
import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.035", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "custom", // operation name
    {
      payer: "1.2.x",
      required_auths: ["1.2.x"],
      id: 1337,
      data: "bytes..."
    }
  );
}

run();

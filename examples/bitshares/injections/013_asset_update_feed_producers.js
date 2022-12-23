import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.013",
    "BTS",
    "wss://node.xbts.io/ws",
    "asset_update_feed_producers",
    {
      issuer: "",
      asset_to_update: "",
      new_feed_producers: [""]
    }
  );
}

run();



import { connect, link } from '../../src/index.js';
import { readData, storeData } from '../lib/localDB.js'
import { TransactionBuilder } from 'bitsharesjs';
import { Apis } from "bitsharesjs-ws";

/**
 * @param {BeetConnection} connection
 * @param {string} wsURL
 * @param {string} sellerAccount
 * @param {number} amountToSell
 * @param {string} soldAsset
 * @param {number} amountToBuy
 * @param {string} boughtAsset
 * @param {Date} currentDate
 */
let bid = async (
    connection,
    wsURL,
    sellerAccount,
    amountToSell,
    soldAsset,
    amountToBuy,
    boughtAsset
  ) => {
    let TXBuilder = connection.inject(TransactionBuilder, {sign: true, broadcast: true});

    try {
      await Apis.instance(
          wsURL,
          true,
          10000,
          {enableCrypto: false, enableOrders: true},
          (error) => console.log(error),
      ).init_promise;
    } catch (error) {
      console.log(`api instance: ${error}`);
      return;
    }

    let tr = new TXBuilder();

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth(); // for example, 2021
    currentDate.setMonth(currentMonth + 1);

    tr.add_type_operation(
      "limit_order_create",
      {
          fee: {
              amount: 0,
              asset_id: "1.3.0"
          },
          seller: sellerAccount,
          amount_to_sell: {
            amount: amountToSell,
            asset_id: soldAsset
          },
          min_to_receive: {
            amount: amountToBuy,
            asset_id: boughtAsset
          },
          fill_or_kill: false,
          expiration: currentDate
      }
    );

    try {
      await tr.set_required_fees();
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      await tr.update_head_block();
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      await tr.set_expire_seconds(2630000); // 1 month exipiry
    } catch (error) {
      console.error(error);
      return;
    }
    
    try {
      tr.add_signer("inject_wif");
    } catch (error) {
      console.error(error);
      return;
    }

    let result;
    try {
      result = await tr.broadcast();
    } catch (error) {
      console.error(error);
      return;
    }

    console.log(result);
    if (connection.identity) {
      storeData(connection.identity)
    }
};

let run = async function () {
  let identity = await readData("InjectExample");

  let connection;
  try {
    connection = await connect(
      "InjectExample",
      "Browser type",
      "localhost",
      null,
      identity ?? null
    );
  } catch (error) {
    console.error(error);
    return;
  }

  let linkAttempt;
  try {
    linkAttempt = await link("BTS", connection);
  } catch (error) {
    console.error(error)
    return;
  }

  if (connection.secret) {
    bid(
      connection,
      "wss://node.xbts.io/ws",
      "1.2.1808745",
      1000,
      "1.3.0",
      1000,
      "1.3.6090"
    );
  }
}

run();



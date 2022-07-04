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
    boughtAsset,
    currentDate
  ) => {
    let TXBuilder = connection.inject(TransactionBuilder, {sign: true, broadcast: true});

    try {
      await Apis.instance(
          wsURL,
          true,
          10000,
          {enableCrypto: false, enableOrders: false},
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
          expiration: currentDate//"2023-01-09T09:30:00"
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
};

let run = async function () {
  let connection;
  try {
    connection = await connect(
      "application name",
      "Browser type forwarded by app",
      "application url",
      null,
      null
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
    console.log('Successfully linked')
    bid(
      connection,
      wsURL,
      sellerAccount,
      amountToSell,
      soldAsset,
      amountToBuy,
      boughtAsset,
      currentDate
    );
  }
}

run();



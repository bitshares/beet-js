import { TransactionBuilder } from 'bitsharesjs';
import { Apis } from "bitsharesjs-ws";

/**
 * @param {BeetConnection} connection
 * @param {string} wsURL
 * @param {string} opType
 * @param {Object} opContents
 */
async function injection (
    connection,
    wsURL,
    opType,
    opContents
  ) {
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
    tr.add_type_operation(opType, opContents);

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

    if (opContents.expiry) {
        try {
            await tr.set_expire_seconds(2630000); // 1 month exipiry
        } catch (error) {
            console.error(error);
            return;
        }
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

export {
    injection
}
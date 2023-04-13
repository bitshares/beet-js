
export const txToString = function (transaction) {
    let raw = {};
    raw.type = transaction.type;
    raw.sequence = transaction.sequence;
    raw.account_number = transaction.account_number;
    raw.chain_id = transaction.chain_id;
    raw.msgs = transaction.msgs;
    raw.memo = transaction.memo;
    raw.signatures = transaction.signatures;
    return JSON.stringify(raw);
};

export const stringToTx = function (TransactionClass, string) {
    let raw = JSON.parse(string);
    let tx = new TransactionClass(raw);
    tx.signatures = raw.signatures;
    return tx;
};

export const binanceInjection = function (binancejs, options) {
  const original = {
      placeOrder: binancejs.placeOrder,
      cancelOrder: binancejs.cancelOrder,
      transfer: binancejs.transfer,
  };
  binancejs.beet = {};
  binancejs.beet.transfer = function (fromAddress, toAddress, amount, asset, memo, sequence) {
      return new Promise((resolve, reject) => {
          let args = ["transfer", "inject_wif", fromAddress, toAddress, amount, asset, memo, sequence];
          sendRequest('api', {
              method: 'injectedCall',
              params: args
          }).then((result) => {
              resolve(result);
          }).catch((err) => {
              reject(err);
          });
      });
  };
  binancejs.beet.cancelOrder = function (fromAddress, symbol, refid, sequence) {
      return new Promise((resolve, reject) => {
          let args = ["cancelOrder", "inject_wif", fromAddress, symbol, refid, sequence];
          sendRequest('api', {
              method: 'injectedCall',
              params: args
          }).then((result) => {
              resolve(result);
          }).catch((err) => {
              reject(err);
          });
      });
  };
  binancejs.beet.placeOrder = function (address, symbol, side, price, quantity, sequence, timeinforce) {
      return new Promise((resolve, reject) => {
          let args = ["placeOrder", "inject_wif", address, symbol, side, price, quantity, sequence, timeinforce];
          sendRequest('api', {
              method: 'injectedCall',
              params: args
          }).then((result) => {
              resolve(result);
          }).catch((err) => {
              reject(err);
          });
      });
  };
  if (!!options.sign && !options.broadcast) {
      const BeetSigningDelegate = async function (tx, signMsg) {
          let txString = txToString(tx);
          let args = ["sign", txString, JSON.stringify(signMsg)];
          let signedTxString = await sendRequest('api', {
              method: 'injectedCall',
              params: args
          });
          return stringToTx(binancejs.client.__tx.default, signedTxString);
      };
      binancejs.setSigningDelegate(BeetSigningDelegate);
  } else if (!!options.sign && !!options.broadcast) {
      // do both in broadcast request
      const NothingSigningDelegate = async function (tx, signMsg) {
          tx.signMsg = signMsg;
          return tx;
      };
      binancejs.setSigningDelegate(NothingSigningDelegate);
      const BeetBroadcastDelegate = async function (signedTx) {
          console.log("Using BeetBroadcastDelegate", signedTx);
          let txString = txToString(signedTx);
          let args = ["signAndBroadcast", txString, JSON.stringify(signedTx.signMsg)];
          let broadcastTxString = await sendRequest('api', {
              method: 'injectedCall',
              params: args
          });
          return JSON.parse(broadcastTxString);
      };
      binancejs.setBroadcastDelegate(BeetBroadcastDelegate);
  } else {
      throw "Unsupported injection options";
  }
  return binancejs;
}

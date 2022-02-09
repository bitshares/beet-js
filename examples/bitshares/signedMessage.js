import BeetESM from 'beet-esm';

BeetESM
  .get("BitShares Signature", "BTS")
  .then(beet => {
    beet.BTS.signMessage("This is a message to be signed!")
      .then(res => {
          console.log(res);
      })
      .catch((err) => {
          console.error(err);
      });
}).catch((err) => {
    console.error(err);
});

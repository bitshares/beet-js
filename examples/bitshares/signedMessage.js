import beet from 'beet-esm';

beet
  .get("BitShares Signature", "Mozilla", "website.tld", "BTS")
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

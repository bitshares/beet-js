import beet from 'beet-esm';

beet.get("BitCoin Transfer Example", "Mozilla", "website.tld", "BTC")
  .then(app => {
    app.BTC.transfer(
        {
            to: "bitcoin_address",
            amount:
                {
                    satoshis: 100000,
                    asset_id: "BTC"
                }
        }
    ).then(result => {
        console.log("Success", result);
    }).catch(err => {
        console.error(err);
    });
  })
  .catch(err => {
      console.error(err);
  });

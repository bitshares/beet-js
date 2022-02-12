import beet from 'beet-esm';

beet.get("My Transfer App", "Mozilla", "website.tld", "EOS", true).then( async app => {
    app.EOS.transfer(
        {
            to: "clockworkbts",
            amount:
                {
                    satoshis: 1,
                    asset_id: "EOS"
                }
        }
    ).then(result => {
        console.log("Success", result);
    }).catch(err => {
        console.error(err);
    });
}).catch(err => {
    console.error(err);
});

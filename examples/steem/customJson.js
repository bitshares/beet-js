import beet from 'beet-esm';
import steem from 'steem';

beet.get('beet-js example for steem', "Mozilla", "website.tld", 'STEEM').then(app => {
    steem = app.STEEM.inject(steem);
    app.STEEM.getAccount().then(account => {
        if (typeof account == "string") {
            // fix bug that causes to return string instead of json
            account = JSON.parse(account);
        }
        // this calls steem.broadcast.customJson(wif, requiredAuths, requiredPostingAuths, id, json, callback)
        steem.broadcast.customJson(
            "inject_wif",
            [account.name],
            [],
            "beet",
            JSON.stringify([
                "broadcast-example",
                {
                    text: "This custom json data was put on Steem with Beet",
                    url: "https://github.com/bitshares/beet"
                }
            ]),
            (err, result) => {
                console.log("injectedCall", err, result);
            }
        );
    });
}).catch((err) => {
    console.error(err);
});

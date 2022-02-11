import beet from 'beet-esm';
import steem from 'steem';

let init = async function() {
    try {
        // link to beet
        let app = await beet.get("Library Injection: Example", "STEEM");
        console.log("Linked account", app.STEEM.getAccount());

        // inject beet
        const beetifiedSteem = app.STEEM.inject(steem);

        beetifiedSteem.broadcast.customJson(
            "inject_wif",  // will be replaced with actual private key in Beet
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
    } catch (err) {
        console.error(err);
    }
};
init();

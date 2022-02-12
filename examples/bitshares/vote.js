import beet from 'beet-esm';

let init = async () => {
    try {
        let app = await beet.get("BitShares Vote Example", "Mozilla", "website.tld", "BTS");
        let result = await app.BTS.voteFor({id: "1.6.117"});
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

init();

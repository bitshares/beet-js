import BeetESM from 'beet-esm';

let init = async () => {
    try {
        let app = await BeetESM.get("BitShares Vote Example", "BTS");
        let result = await app.BTS.voteFor({id: "1.6.117"});
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

init();

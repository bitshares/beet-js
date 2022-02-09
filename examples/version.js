import BeetESM from 'beet-esm';

let init = async function() {
    try {
        let version = await BeetESM.ping();
        console.log(version);
    } catch (err) {
        console.error(err);
    }
};

init();

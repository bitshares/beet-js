import beet from 'beet-esm';

let init = async function() {
    try {
        let version = await beet.ping();
        console.log(version);
    } catch (err) {
        console.error(err);
    }
};

init();

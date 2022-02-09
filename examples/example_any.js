import BeetESM from 'beet-esm';

BeetESM.get("My App", ["ANY"], true).then( async app => {
    console.log(app.BTS);
    console.log(app.STEEM);
});

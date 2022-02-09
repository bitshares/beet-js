import BeetESM from 'beet-esm';

BeetESM.get('beet-js example for steem', 'STEEM').then(app => {
    app.STEEM.voteFor(
         {
             author: "krazykrista",
             permlink: "bitshares-scam-do-not-accept-proposed-transactions-that-update-your-account-data",
             weight: 1
         }
    ).then(account => {
        console.log("voteFor", account);
    }).catch((err) => {
        console.error("voteFor", err);
    });
    app.STEEM.voteFor(
        {
            witness: "krazykrista",
            approve: true
        }
    ).then(account => {
        console.log("voteFor", account);
    }).catch((err) => {
        console.error("voteFor", err);
    });
}).catch((err) => {
    console.error(err);
});

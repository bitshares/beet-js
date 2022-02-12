import beet from 'beet-esm';

beet.get("My App", "Mozilla", "website.tld", "ANY", true).then( async app => {
    console.log(app.BTS);
    console.log(app.STEEM);
});

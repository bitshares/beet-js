# BeetJS

BeetJS is the client library for interaction with Beet (https://github.com/bitshares/beet).

## Installation

### Node module

    npm install @beetapp/beet-js

### Browserify

The browser bundle is built using webpack and can be found in 

    dist/beet-js.js

## Examples

Examples to try and play around can be found in `examples` folder. Basically there are two options, library injection and direct calls.

### Library injection

Powerful and easy way to integrate Beet is by using injection. Not supported for all chains yet.

List of supported blockchains:
 - BitShares
 - Steem, WhaleShares and Smoke
 - BinanceChain

**Generic**
In this example, `SYMBOL` is the core token of the blockchain you want to interact with (e.g. `BTS` with the BitShares Blockchain) and `someBlockchainLibrary` needs to be filled with the library you want to use.

```
<script src="beet-js.js"></script>
<script src="some-blockchain-library.js"></script>

<script>
    let init = async function() {
        try {
            // link to beet
            let app = await beet.get("Binance Transfer Example", "SYMBOL");
            console.log("Linked account", app.SYMBOL.getAccount());
  
            const someBlockchainLibrary = ... // load your blockchain library
            let beetifiedLibrary = app.BNB_TEST.inject(someBlockchainLibrary);
            
            // use like beetifiedLibrary just as if its the normal library, every signature and broadcast request is redirected to Beet
        } catch (err) {
            console.error(err);
        }
    };
    init();
</script>
```

**Steem**
```
<script src="beet-js.js"></script>
<script src="https://cdn.steemjs.com/lib/latest/steem.min.js"></script>

<script>
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
</script>
```

### Direct Calls
 
Beet supports direct calls which are implemented for each chain. Currently that is `transfer`, `vote`, `signMessage` and `verifyMessage`.

#### vote

Not available for every chain.

**Steem**

```
<script src="beet-js.js"></script>

<script>
    let init = async function() {
        try {
            let app = await beet.get("Direct Call: Transfer", "STEEM");
            console.log("Linked account", app.STEEM.getAccount());
            await app.STEEM.voteFor(
                {
                    author: "clockwork",
                    permlink: "beet-the-bitshares-companion",
                    weight: 1
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    init();
</script>
```

**BitShares**

```
<script src="dist/beet-js.js"></script>

<script>
    let init = async function() {
        try {
            let app = await beet.get("BitShares Vote Example", "BTS");
            await app.BTS.voteFor({id: "1.6.117"});  // witness clockwork
        } catch (err) {
            console.error(err);
        }
    };
    init();
</script>
```

#### transfer

**BinanceChain (Testnet)**
Async
```
<script src="beet-js.js"></script>

<script>
    let init = async function() {
        try {
            let app = await beet.get("Direct Call: Transfer", "BNB_TEST");
            console.log("Linked account", app.BNB_TEST.getAccount());
            await app.BNB_TEST.transfer(
                {
                    to: "tbnb1ems4j20fq6e24pjmqht7le78uteqp6nftexxn2",
                    amount:
                        {
                            satoshis: 10000,
                            asset_id: "BNB"
                        }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    init();
</script>
```

#### signMessage

**EOSIO Mainnet**
Promisified
```
<script src="beet-js.js"></script>

<script>
beet.get("Direct Call: Signed Message", "EOS").then(beet => {
    beet.EOS.signMessage("This is a message to be signed!").then(res => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
});
</script>
```

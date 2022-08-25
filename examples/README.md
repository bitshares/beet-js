# Beet-JS Examples

These examples require the NodeJS runtime installed prior to running.

Navigate to this folder in a new terminal then run `yarn install` to install the dependencies for the bitshares examples.

Launch and unlock your Beet client prior to running an example.

Several examples include variables you can change, do so prior to running them.

The examples below when run will prompt the Beet user multiple times for linking, retrieving data and for performing blockchain actions on your behalf.

## Storing linked identity for later session relink

These examples use the package `lowdb` to store your linked identity in a db.json file.

If you want your users to be able to relink with BEET then you'll need to implement similar functionality storing the identity values for later use either to file or to localstorage.

## Connect to the Beet wallet

`node .\connect.js`

This establishes a socket.io connection with the Beet wallet locally.

## Link app to the Beet wallet

`node .\link.js`

After connecting, you must link your app to the wallet prior to interacting with the wallet and associated blockchains.

## Retreive Beet account summary

`node .\bitshares\getAccount.js`

Retrieve the user's Bitshares id for app personalization.

Prompts user to relink with stored identity.

## Use bitsharesjs with Beet

`node .\bitshares\inject.js`

Construct advanced bitshares transactions then broadcast them to the Bitshares network via the Beet wallet.

Prompts user to relink with stored identity.

## Sign and verify messages

`node .\bitshares\signedMessage.js`

Signs then immediately verifies the message, prompts the user 3 times.

Prompts user to relink with stored identity.

## Transfer blockchain assets

`node .\bitshares\transfer.js`

Transfer bitshares to another account, edit the script prior to running.

Prompts user to relink with stored identity.

## Vote for a vote object on the Bitshares blockchain

`node .\bitshares\vote.js`

Vote for a single Bitshares vote id.

Prompts user to relink with stored identity.

## Sign an NFT Object

`node .\bitshares\signNFT.js`

Sign the contents of an NFT you plan on issuing.

Prompts user to relink with stored identity.
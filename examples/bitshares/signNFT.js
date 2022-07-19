import { connect, link } from '../../src/index.js';

let run = async function () {
    let connection;
    try {
      connection = await connect(
        "App name",
        "Browser type",
        "localhost"
      );
    } catch (error) {
      console.error(error);
      return;
    }
  
    let linkAttempt;
    try {
      linkAttempt = await link("BTS", connection);
    } catch (error) {
      console.error(error)
      return;
    }
  
    if (!connection.identity) {
      console.log("Link rejected");
      return;
    }

    let nft_object = {
        acknowledgements: 'example acknowledgements',
        artist: 'artist name',
        attestation: 'attestation',
        encoding: 'PNG',
        media_png_multihash: 'test.png',
        media_png_multihashes: [{url: 'test.png', type: 'PNG'}],
        holder_license: 'license 1',
        license: 'license 2',
        narrative: 'narrative',
        sig_pubkey_or_address: 'publicMemoKey',
        title: 'NFT title',
        tags: 'tag,test',
        type: 'NFT/ART/VISUAL'
    };
    
    let signedPayload;
    try {
      signedPayload = await connection.signNFT(nft_object);
    } catch (error) {
      console.log(error);
      return;
    }
    
    console.log(signedPayload);
}

run();
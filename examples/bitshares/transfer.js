/**
 * @param {BeetConnection} connection
 * @param {string} targetAccount
 * @param {number} amountInSatoshi
 * @param {string} assetId
 */
async function transfer() {
  connection.transfer({
      to: targetAccount,
      amount: {
        satoshis: amountInSatoshi,
        asset_id: assetId
      }
  })
}

triggerTransfer('sschiessl', 1, '1.3.0')

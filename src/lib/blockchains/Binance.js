
export const txToString = function (transaction) {
    let raw = {};
    raw.type = transaction.type;
    raw.sequence = transaction.sequence;
    raw.account_number = transaction.account_number;
    raw.chain_id = transaction.chain_id;
    raw.msgs = transaction.msgs;
    raw.memo = transaction.memo;
    raw.signatures = transaction.signatures;
    return JSON.stringify(raw);
};

export const stringToTx = function (TransactionClass, string) {
    let raw = JSON.parse(string);
    let tx = new TransactionClass(raw);
    tx.signatures = raw.signatures;
    return tx;
};

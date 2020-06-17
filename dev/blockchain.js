function Blockchain () {
  this.chain = [];
  this.newTransactions = [];
}

Blockchain.prototype.crateNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.newTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash
  }
  return newBlock;
}
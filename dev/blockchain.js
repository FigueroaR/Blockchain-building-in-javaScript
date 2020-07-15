// npm packages 
const sha256 = require("sha256")
/////////////////////////////////////////////
const uuid = require('uuid').v4;

const currentNodeUrl = process.argv[3];


// contructor funtion
function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  this.currentNodeUrl = currentNodeUrl
  this.networkNodes = []

  this.createNewBlock(100, '0', '0');
}
///////////////////////////////////////////////


// Methods For contructor function
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash
  }

  this.pendingTransactions = []
  this.chain.push(newBlock)
  return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1]
}

Blockchain.prototype.createNewtransaction = function(amount, sender, recipient) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
    transactionId: uuid().split('-').join('')
  };

  return newTransaction
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
  this.pendingTransactions.push(transactionObj)
  return this.getLastBlock()['index'] + 1;
}



Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlock, nonce){
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlock)
  const hash = sha256(dataAsString)
  return hash
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  let nonce = 0
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
    //console.log(hash)
  }
  return nonce;
}


Blockchain.prototype.chainIsValid = function() {
  let validChain = true

  for (var i = 1; i < blockchain.legnth; i++) {
    const currentBlock = blockchain[i]
    const prevBlock = blockchain[i - 1];
    const blockHash = this.blockHash(prevBlock['hash'], {transactions: currentBlock['transactions'], index: currentBlock['index']}, currentBlock['nonce'])
    if (blockHash.substring(0, 4) !== "0000") validChain = false;
    if (currentBlock['previousBlockHash'] !== prevblock['hash']) validChain = false;
  };

  const genesisBlock = blockchain[0];
  const correctNonce = genesisBlock['nonce'] === 100;
  const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
  const correctHash = genesisBlock['hash'] == '0';
  const correctTrasactions = genesisBlock['transactions'].length === 0;

  if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTrasactions) validChain = false;

  return validChain
}
///////////////////////////////////////////////////

// export Blockchain contructor along wih its method
module.exports = Blockchain;
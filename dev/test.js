const BlockChain = require('./blockchain'); // import blockchain.js

const bitcoin = new BlockChain(); // new instance of blockchain object

//fake blocks
bitcoin.createNewBlock(10257,"GHGURFUFU", 'FSDFSDF45216')
bitcoin.createNewBlock(45120,"GFD4SFSD4", 'RGRG565GR6D6')

//we are creating a new transaction, fake transactions
bitcoin.createNewtransaction(100, "ALEX4878GJGIKGIKUGI", "JEN789645KGKGIYG");

//mining a new block // new transactions are inside the teansactions array
bitcoin.createNewBlock(123456, "000FHKEFHKUEF", "JKJK0000UG")

console.log(bitcoin.chain)
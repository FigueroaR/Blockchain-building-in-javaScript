const BlockChain = require('./blockchain'); // import blockchain.js || data structure

const bitcoin = new BlockChain(); // new instance of blockchain object

// WE will create a hash
// variables for our method to ingest
const previousBlockHash = 'HJHJF4156834HJ'
const currentBlockData = [
    {
        amount: 10,
        sender: 'EYEHFGFKHFJF8796',
        recipient: 'TYUIYIUGKB8964654'
    },
    {
        amount: 48,
        sender: 'RTFGFVGHVJ484',
        recipient: 'TYIGUVJBHGKB8964654'
    },
    {
        amount: 100,
        sender: 'BUGVYHGB4516458',
        recipient: 'GHJIUGKB8964654'
    }
]


console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 50923))
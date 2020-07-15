const BlockChain = require('./blockchain'); // import blockchain.js || data structure

const bitcoin = new BlockChain(); // new instance of blockchain object

//console.log(bitcoin)

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1594794333993,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1594795436243,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1594795439495,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "785712df37a6497eae57eca3b444c04e",
                    "transactionId": "2bb9e91f6e6a4ce9bac04e18b795016e"
                }
            ],
            "nonce": 36817,
            "hash": "00005d4b523303f0f57976a486a52ad5dcc1c1aed6a5a7e8f0d42997775a231e",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1594795467640,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "785712df37a6497eae57eca3b444c04e",
                    "transactionId": "dc7778dc043a4771ba98de5a7f7a940a"
                },
                {
                    "amount": 500,
                    "sender": "MEMEMEMEGJHB531",
                    "recipient": "YO4864156YO84",
                    "transactionId": "a3f35c1d596e40f0b26e47f306163f51"
                }
            ],
            "nonce": 45930,
            "hash": "00009deddccc29eea75ec48a2ebb4cf581e3bc7a0169de577068628ffebdea29",
            "previousBlockHash": "00005d4b523303f0f57976a486a52ad5dcc1c1aed6a5a7e8f0d42997775a231e"
        },
        {
            "index": 5,
            "timestamp": 1594795545647,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "785712df37a6497eae57eca3b444c04e",
                    "transactionId": "94515fc6e9314deda6c83c4973683baf"
                },
                {
                    "amount": 100,
                    "sender": "MEMEMEMEGJHB531",
                    "recipient": "YO4864156YO84",
                    "transactionId": "2161054d8353416ba17f3c712ae24122"
                },
                {
                    "amount": 9900,
                    "sender": "MEMEMEMEGJHB531",
                    "recipient": "YO4864156YO84",
                    "transactionId": "d8ffb24ee5d54055b108361390f26100"
                }
            ],
            "nonce": 27697,
            "hash": "0000efb04c82fb9b104c9012dc59e3ed943fbf87a57d674393905ea545e8d292",
            "previousBlockHash": "00009deddccc29eea75ec48a2ebb4cf581e3bc7a0169de577068628ffebdea29"
        },
        {
            "index": 6,
            "timestamp": 1594795556477,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "785712df37a6497eae57eca3b444c04e",
                    "transactionId": "e86fb64c6b4b464a82fcf49038f5d32e"
                }
            ],
            "nonce": 42910,
            "hash": "0000d23e0a4825ec16853325224b7ee476ca481caa029fe00da78017cbd953db",
            "previousBlockHash": "0000efb04c82fb9b104c9012dc59e3ed943fbf87a57d674393905ea545e8d292"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "785712df37a6497eae57eca3b444c04e",
            "transactionId": "b3379aeed6cd4ca9833ee14053e99f56"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": [
        "http://localhost:3002"
    ]
};

console.log('valid: ', bitcoin.chainIsValid(bc1.chain))
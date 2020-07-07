const Blockchain = require('./blockchain');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uuid = require('uuid').v4;

const nodeAddress = uuid().split('-').join('')

const bitcoin = new Blockchain();

 // if a request comes with json, les parse, so we can acces it ina ny route
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/blockchain', function(req, res) {
    res.send(bitcoin)
})

app.post('/transaction', function(req, res){
    //console.log(req.body)
    const blockIndex = bitcoin.createNewtransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({status: `you block index is ${blockIndex}.`})
})

app.get('/mine', function(req, res){
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    bitcoin.createNewtransaction(12.5, "00", nodeAddress)

    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        node: "new block mined",
        block: newBlock    
    })
})

app.listen(3000, function (){
    console.log("Listening on localhost 3000.......")
})
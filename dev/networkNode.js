const Blockchain = require('./blockchain');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uuid = require('uuid').v4;
const port = process.argv[2];

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

// resguster a node with the network
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl)
    const regNodesPromises = []
    bitcoin.networkNodes.forEach( networkNodeUrl => {
        const resquestOptions = {
            uri: networkNodeUrl + '/resgister-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json: true
        };
        regNodesPromises.push(rp(resquestOptions))
    });

    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworksNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        };
        return rp(bulkRegisterOptions)
    })
    .then( data => {
        res.json({note: 'New Node registered with network succefully!'})
    });
});

app.post('/resgister-node', function(req, res){
    //
});

app.post('resgiter-nodes-bulk', function(req, res){
    //
});


app.listen(port, function (){
    console.log(`Listening on localhost ${port} ....`)
})
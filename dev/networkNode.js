const Blockchain = require('./blockchain');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uuid = require('uuid').v4;
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('')

const bitcoin = new Blockchain();

 // if a request comes with json, les parse, so we can acces it ina ny route
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/blockchain', function(req, res) {
    res.send(bitcoin)
})

//create new trnsaction 
app.post('/transaction', function(req, res){
    //console.log(req.body)
    const blockIndex = bitcoin.createNewtransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({status: `you block index is ${blockIndex}.`})
})

app.post('/transaction/broadcast', function(req, res) {
    const newTransaction = bitcoin.createNewtransaction(req.body.amount, req.body.sender, req.body.recipient)
    bitcoin.addTransactionToPendingTransactions(newTransaction)

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/trnsaction',
            method: 'POST',
            body: newTransaction,
            json: true 
        };
        requestPromises.push(rp(requestOptions))
    });

    Promise.all(requestPromises)
    .then(data => {
        requestPromises.json({ note: "Trnsaction created and brodcasted succesfully."})
    })
})


// mine pending trnsactions
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

// register a node and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ] },
			json: true
		};

		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});


app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note: 'New node registred succesfully'})
});

app.post('/register-nodes-bulk', function(req, res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl)
    })

    res.json({ note: 'Bulk registration successful.' });
});


app.listen(port, function (){
    console.log(`Listening on localhost ${port} ....`)
})
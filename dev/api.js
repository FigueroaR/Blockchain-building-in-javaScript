const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

 // if a request comes with json, les parse, so we can acces it ina ny route
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/blockchain', function(req, res) {
    res.send(bitcoin)
})

app.post('/transaction', function(req, res){
    console.log(req.body)
    const blockIndex = bitcoin.createNewtransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({status: `you block index is ${blockIndex}.`})
})

app.get('/mine', function(req, res){

})

app.listen(3000, function (){
    console.log("Listening on localhost 3000.......")
})
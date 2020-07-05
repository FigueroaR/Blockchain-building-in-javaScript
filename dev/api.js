var express = require('express')
const Blockchain = require('./blockchain')
var app = express()

// app.get('/', function(req, res) {
//     res.send('hello World')
// })

app.get('/blockchain', function(req, res) {
    
})

app.post('/transaction', function(req, res){

})

app.get('/mine', function(req, res){

})

app.listen(3000, function (){
    console.log("Listening on localhost 3000.......")
})
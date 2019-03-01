// JavaScript source code
var express = require('express');

var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'index.html'))
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
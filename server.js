// JavaScript source code
const Bundler = require('parcel-bundler');
var express = require('express');

var app = express();

const file = 'index.html';
const options = {};

const bundler = new Bundler(file, options);

app.use(bundler.middleware());
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.listen(port);
// JavaScript source code
//var MongoClient = require('mongodb').MongoClient;
//test = require('assert');

const mongodb = require('mongodb'); 
const http = require('http'); 
const nconf = require('nconf'); 
let uri = "mongodb://<username>:<password>@html-td-shard-00-00-lp7zx.gcp.mongodb.net:27017,html-td-shard-00-01-lp7zx.gcp.mongodb.net:27017,html-td-shard-00-02-lp7zx.gcp.mongodb.net:27017/fantasyTD?ssl=true&replicaSet=HTML-TD-shard-0&authSource=admin&retryWrites=true";
/*if (nconf.get('mongoDatabase')) 
{ 
    uri = ${uri}/${nconf.get('mongoDatabase')}; 
}*/ 
console.log(uri);
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
        test.equal(null, err);
        var collection = client.db("fantasyTD").collection("credentials");

        function login()
        {
            var credentials = {username: document.getElementById('username').value, password: document.getElementById('password').value};
            collection.find({username: credentials.username, password: credentials.password}, function(err, res) {
                if(res.length > 0){
                    document.getElementById('content').style.display = 'visible';
                    document.getElementById('login').style.display = 'none';
                }
            });
        };
    // perform actions on the collection object
    collection.find().toArray(function (err, docs) {
        console.log(JSON.stringify(docs));
    });
    /*collection.insert({
        username: "George", password: "georgeRulez",
        progress: { gold: 30, stage1: true, stage2: false, stage3: false, wave: 7 }
    });
    collection.find().toArray(function (err, docs) {
        console.log(JSON.stringify(docs));
    });*/
    client.close();
});


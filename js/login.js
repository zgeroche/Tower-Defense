// Instantiate MongoDB instance
const {
    Stitch,
    RemoteMongoClient,
    } = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('html-game-onuim');
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
const collection = db.db('fantasyTD').collection('credentials');

var express = require('express');

var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../index.html'))
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

//Login button with verification
loginButton = document.getElementById('Login');
loginButton.addEventListener('click', function(event){

    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    const query = {username: user, password: pass};
    console.log(query);
    const options = {limit: 1};

    return collection.find(query, options).first()
    .then(result => {
        if (result) {
            console.log(`Found document: ${JSON.stringify(result)}`)
            document.getElementById('content').style.display = 'inline';
            document.getElementById('login').style.display = 'none';
        } else {
            console.log(`nothing found for user:${user}, password:${pass}`)
            alert('Incorrect Username or Password');
        }
        return result
    }).catch(err => console.error(`Failed to find document: ${err}`))   
});

//New user creation button
newUserButton = document.getElementById('New User');
newUserButton.addEventListener('click', function(event){
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    const newItem = {
        username: user, 
        password: pass, 
        progress: {
            gold: 0, 
            stage1: false, 
            stage2: false, 
            stage3: false, 
            wave:1}
    };

    collection.find({username: user}, {limit: 1}).first()
    .then (result => {
        if (result) {
            alert('Username already in use');
        }
        else {
            collection.insertOne(newItem)
            .then(result => {
                console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            })
        }
    })
    .catch(err => console.error(`Failed to insert item: ${err}`))
});

app.listen(port);

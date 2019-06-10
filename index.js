var app = require('express')();
const express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Bob:C00lD%40ta@cluster0-fguxs.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/HomePage.html');
});

//Web Sockets

var newUser;

io.on('connection', function (socket) {
    socket.on("newUser", function (data) {
        newUser = data;
        console.log(newUser)
        client.connect(err => {
            const db = client.db("MongoTry")
            db.collection("users").insertOne(newUser)
        });
    })
    socket.on("login", function (data){
        client.connect(err => {
            const db = client.db("MongoTry")
            db.collection("users").find(data).toArray(function(err, result){
                if(result.length == 0){
                    socket.emit("loginCheck", false)
                }
                if(result.length != 0){
                    socket.emit("loginCheck", true)
                }
            });
        });
    })
});

app.use(express.static('public'))





var app = require('express')();
const admin = require('firebase-admin');
const serviceAccount = require('./chatapp2-78dd3-firebase-adminsdk-mic7b-544b2886aa.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var db = admin.firestore();
const express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/HomePage.html');
});

//Web Sockets

var newUser;

io.on('connection', function (socket) {
  socket.on("data", function (data) {
      newUser = data;
      var docRef = db.collection('users').doc(newUser.uname);

      docRef.set(newUser)
  })
});

app.use(express.static('public'))

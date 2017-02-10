/*--------------
Express Routing
--------------*/
var express = require('express');
var app = express();
app.use(express.static('static'));
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(bodyParser.json());
/*------
MongoDB
------*/
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/clients');
// users collection
var ClientsSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
  firstname: String,
  lastname: String,
  latitude: String,
  longitude: String
});
var Clients = mongoose.model('Clients', ClientsSchema);

/*-----
Routes
-----*/
// Get static HTML pages
app.get('/',function (req, res) {
  res.render('index');
});

/*---
CRUD
---*/
// Create
app.post('/client', function (req, res) {
  var n = new Clients();
  n.firstname = req.body.firstname;
  n.lastname = req.body.lastname;
  n.latitude = req.body.latitude;
  n.longitude = req.body.longitude;
  n.save();
  n.save(function(err,client) {
    console.log('Adds the client '+client._id);
    res.status((!err) ? 200 : 500).json((typeof(client) !== 'undefined') ? client : {error: true});
  });
});
// Read
app.get('/client', function (req, res) {
  Clients.find({}, function(err, clients) {
    console.log('Returns '+clients.length+' todos');
    res.status((!err) ? 200 : 500).json((typeof(clients) !== 'undefined') ? clients : {error: true});
  });
});
// Update
app.put('/client', function (req, res) {
  var update = {};
  if (typeof(req.body.firstname) !== 'undefined'){ update['firstname'] = req.body.firstname; }
  if (typeof(req.body.lastname) !== 'undefined'){ update['lastname'] = req.body.lastname; }
  if (typeof(req.body.latitude) !== 'undefined'){ update['latitude'] = req.body.latitude; }
  if (typeof(req.body.longitude) !== 'undefined'){ update['longitude'] = req.body.longitude; }
  Clients.findOneAndUpdate({'_id':req.body._id}, update, {}, function(err,client) {
    console.log('Update client id '+client._id)
    res.status((!err) ? 200 : 500).json((typeof(client) !== 'undefined') ? client : {error: true});
  });
});
// Delete
app.delete('/client/:id', function (req, res) {
  Clients.findOneAndRemove({'_id':req.params.id}, function(err, client){
    console.log('Removes the client '+client._id);
    res.status((!err) ? 200 : 500).json((typeof(client) !== 'undefined') ? client : {error: true});
  });
});
/*----
Start
----*/
app.listen(3000);
console.log('server.js listens 3000');
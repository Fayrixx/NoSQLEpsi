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
mongoose.connect('mongodb://localhost:27017/deaddrop');
// users collection
var DeadDropSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
  iv: String,
  v: Number,
  iter: Number,
  ks: Number,
  ts: Number,
  mode: String,
  adata: String,
  cipher: String,
  salt: String,
  ct: String
});
var DeadDrop = mongoose.model('DeadDrop', DeadDropSchema);

/*-------------------
Execution code parts
-------------------*/
/*
Log a request
*/
function logRequest(req, res, callback){
  callback(req, res);
  console.log(req.method+' '+req.headers.host+req.url+' from '+req.connection.remoteAddress);
}

function createDeadDrop(req, res){
  var n = new DeadDrop();
  n.iv = req.body.iv;
  n.v = req.body.v;
  n.iter = req.body.iter;
  n.ks = req.body.ks;
  n.ts = req.body.ts;
  n.mode = req.body.mode;
  n.adata = req.body.adata;
  n.cipher = req.body.cipher;
  n.salt = req.body.salt;
  n.ct = req.body.ct;
  n.save(function(err,deaddrop) {
    if (!err && typeof(deaddrop) !== 'undefined'){
      res.status(200).send(String(deaddrop._id));
    } else {
      res.status(500).send('error');
    }
  });
  
}

function readDeadDrop(req, res){
  DeadDrop.findOne({'_id':req.body.id}, function(err,deaddrop) {
    if (err){
      res.status(500).send('error');
    } else {
      if (typeof(deaddrop) === 'undefined'){
        res.status(200).send('0');
      } else {
        res.status(200).json(deaddrop);
      }
    }
  });
}

function updateDeadDrop(req, res){
  DeadDrop.findOneAndUpdate({'_id':req.body.id}, {
    'iv':req.body.iv,
    'v':req.body.v,
    'iter':req.body.iter,
    'ks':req.body.ks,
    'ts':req.body.ts,
    'mode':req.body.mode,
    'adata':req.body.adata,
    'cipher':req.body.cipher,
    'salt':req.body.salt,
    'ct':req.body.ct
  }, {}, function(err,deaddrop) {
    if (!err && typeof(deaddrop) !== 'undefined'){
      res.status(200).send(req.body.id);
    } else {
      res.status(500).send('error');
    }
  });
}

function deleteDeadDrop(req, res){
  DeadDrop.findOneAndRemove({'_id':req.body.id}, function(err, deaddrop){
    if (!err){
      res.status(200).send(req.body.id);
    } else {
      res.status(500).send('error');
    }
  });
}

app.route('/create')
  .post(function(req, res) {
    logRequest(req, res, createDeadDrop);
  });

app.route('/read')
  .post(function(req, res) {
    logRequest(req, res, readDeadDrop);
  });

app.route('/update')
  .post(function(req, res) {
    logRequest(req, res, updateDeadDrop);
  });

app.route('/delete')
  .post(function(req, res) {
    logRequest(req, res, deleteDeadDrop);
  });

/*-----
Run it
-----*/
app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

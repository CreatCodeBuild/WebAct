var express = require('express');
var router = express.Router();
var zerorpc = require('zerorpc');
var fs = require('fs');
var ServerSocketManager = require('../SocketioServerManager');
var serverSocketManager = new ServerSocketManager(express);

var zerorpcClient = new zerorpc.Client();
zerorpcClient.connect('tcp://127.0.0.1:8888')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var multer = require('multer');
var upload = multer({dest: 'uploads/'});
router.post('/image_process', upload.single('image_process'), function(req, res) {
// router.post('/image_process', function(req, res) {
  console.log(typeof req.file)
  res.end(req.file);
  fs.writeFile('temp.jpg', req.file, function() {
      console.log('write done');
  });
  res.end('abc')
  // client.invoke('prcess_image', image, function(err, result, more) {
  //   console.log(result);
  // });
});

module.exports = router;

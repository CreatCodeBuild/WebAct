var express = require('express');
var router = express.Router();
var zerorpc = require('zerorpc');

var client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:8888')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/image_process', function(req, res) {
  //todo: implement it
  // var image = req.body.data;
  console.log(typeof req.body)
  res.end(new Buffer(req.body));
  // client.invoke('prcess_image', image, function(err, result, more) {
  //   console.log(result);
  // });
});

module.exports = router;

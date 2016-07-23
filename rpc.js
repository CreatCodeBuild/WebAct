var zerorpc = require('zerorpc');
var zerorpcClient = new zerorpc.Client();
zerorpcClient.connect('tcp://127.0.0.1:8888')

module.exports = zerorpcClient;

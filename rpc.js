var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:8888')

let zeroClient = {
  /*
    image_buffer: file, string buffer, or similar
    callback: should be a function that handles res at the caller level
  */
  process_image: function(image_buffer, callback) {
    client.invoke('process_iamge', image_buffer, function(error, res, more) {
        console.log(res);
        callback(res)
    });
  }
}


module.exports = zeroClient;

var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
const EVENT = require('./events');
client.connect('tcp://127.0.0.1:8888')
const myEvent = require('./events');


/* Note: 2016/07/25, Monday, 00:55
  I found that rpc is not a good solution for my need. It requires too much overhead on my writing side.
  Though it might be a good solution when my need grows.
  Temporarily give up zero rpc.
  Now my solution is to let NodeJS write the image to a directory, then let Python read
  this image from that directory.
  After image processing, Python writes to the same directory and then NodeJS reads it.
  The problem is that file system does not prevent racing condition.
  The most straing forward solution is to use standard input output, but, it seems that
  Python OpenCV can't write correct image buffer into stdout.
*/

// should change this to module pattern !!!

var zeroClient = {
  /*
    image_buffer: file, string buffer, or similar
    callback: should be a function that handles res at the caller level
  */
  process_image: function(image_buffer) {
    client.invoke('process_image', image_buffer, function(error, res, more) {
        this.process_image_callback(error, res, more);
    });
  },

  process_image_callback: function(error, result, more) {

    console.log(' error type:', typeof error);
    console.log('result type:', typeof result);
    console.log('  more type:', typeof more);
    if(result === undefined || error !== undefined) { //error
      console.log(error);
    } else {
      console.log('result length:'. result.length);
      let results = [];
      let size = 0;
      for(let i = 0; i < result.length; i++) {
        size += result[i].length;
        console.log(result[i].length);
      }
      console.log('total size:', size);
      results.push(result);
      // separating of concerns, let event handler to decide what to do
      myEvent.emitter.emit(myEvent.EVENT.SEND_IMAGE_TO_BROWSER, results);
    }
  }
};


module.exports = zeroClient;



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

function zeroClient() {
  var TAG = 'zeroClient';

  console.log(TAG, 'import');

  var zerorpc = require('zerorpc');
  var ioFormater = require('./io_formater');

  var client = new zerorpc.Client();
  client.connect('tcp://127.0.0.1:8888');

  var myEmitter;
  var EVENT;

  function init(emitter, allEvents) {
    myEmitter = emitter;
    EVENT = allEvents;
  }

  /*
    image_buffer: file, string buffer, or similar
    callback: should be a function that handles res at the caller level
  */
  function process_image(image_buffer) {
    client.invoke('process_image', image_buffer, function(error, res, more) {
        process_image_callback(error, res, more);
    });
  }

  function process_image_callback(error, result, more) {

    console.log(TAG, ' error type:', typeof error);
    console.log(TAG, 'result type:', typeof result);
    console.log(TAG, '  more type:', typeof more);
    if(result === undefined || error !== undefined) { //error
      console.log(error);
    } else {
      console.log(TAG, 'result length:', result.length);

      let newBuffer = ioFormater.array_to_buffer(result);

      //separating of concerns, let event handler to decide what to do
      //myEmitter.emit(EVENT.SEND_IMAGE_TO_BROWSER, newBuffer);
    }
  }

  client.invoke('test', 'ÿ', function(error, res, more) {
    console.log(res.charCodeAt(0));
    console.log(Buffer.from(res, 'binary'));
  });


  console.log('rpc.js zeroClient return');
  return {
    init: init,
    process_image: process_image
  }
}


module.exports.publicAPI = zeroClient();

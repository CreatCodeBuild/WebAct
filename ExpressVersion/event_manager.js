/*
  Define all events which are used in this project
  定义所有本项目使用的事件，和相关监听器

  Now this module acts like a central access point for other modules
 */

console.log('events.js');
function EventManager() {
  console.log('My Event Module');

  const EventEmitter = require('events');

  const zeroClient = require('./rpc').publicAPI;
  const socketioManager = require('./socketio_server_manager').publicAPI;

  var server;

  var EVENT = {
    FILE_UPLOAD: 'file upload', //need change to 'uploading file'
    DONE_UPLOAD: 'done upload',
    RECEIVED_FILE_FROM_BROWSER: 'received file from browser',
    PROCESSED_IMAGE: 'processed image',
    SEND_IMAGE_TO_PYTHON: 'send image to python',
    RECEIVED_IMAGE_FROM_PYTHON: 'received image from python',
    SEND_IMAGE_TO_BROWSER: 'send image to browser'
  };

  function init(httpServer) {
    server = httpServer;
    zeroClient.init(publicAPI.emitter, publicAPI.EVENT);
    socketioManager.init(server, publicAPI);
  }

  class MyEventEmitter extends EventEmitter {}
  const eventEmitter = new MyEventEmitter();

  eventEmitter.on(EVENT.FILE_UPLOAD, function(bytes) {
    //receive from browser
  });

  eventEmitter.on(EVENT.DONE_UPLOAD, function(bytes) {
    //send image to python?
  });

  eventEmitter.on(EVENT.RECEIVED_FILE_FROM_BROWSER, function(bufferArray) {
    console.log('eventEmitter:', zeroClient);
    zeroClient.process_image(bufferArray);
  });

  eventEmitter.on(EVENT.PROCESSED_IMAGE, function(bytes) {
    //send bytes back to browser
    //todo: implement it
    //check out the socketio and socket stream api
    //probably a change to refine the code
  });

  eventEmitter.on(EVENT.SEND_IMAGE_TO_PYTHON, function(bytes) {
    //send image to python
  });

  eventEmitter.on(EVENT.RECEIVED_IMAGE_FROM_PYTHON, function(bytes) {
    //send bytes back to browser
  });

  eventEmitter.on(EVENT.SEND_IMAGE_TO_BROWSER, function(dataToSend) {
    socketioManager.send_image_to_browser(dataToSend);
  });

  var publicAPI = {
    init: init,
    EVENT: EVENT,
    emitter: eventEmitter
  };

  console.log('My Event Module Return');
  return publicAPI;
}


module.exports.publicAPI = EventManager();

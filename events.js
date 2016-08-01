/*
  Define all events which are used in this project
  定义所有本项目使用的事件
 */

 const EventEmitter = require('events');

var EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload',
	PROCESSED_IMAGE: 'processed image',
  SEND_IMAGE_TO_PYTHON: 'send image to python',
  RECEIVED_IMAGE_FROM_PYTHON: 'received image from python'
}

class MyEventEmitter extends EventEmitter {}
const eventEmitter = new MyEventEmitter();

eventEmitter.on(EVENT.FILE_UPLOAD, function(bytes) {
  //receive from browser
});

eventEmitter.on(EVENT.DONE_UPLOAD, function(bytes) {
  //send image to python?
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

var publicAPI = {
  EVENT: EVENT,
  emitter: EventEmitter
}

module.exports = publicAPI

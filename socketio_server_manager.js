var socketio = require('socket.io');
var ss = require('socket.io-stream');
// var fs = require('fs');

const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload'
}

const TAG = 'ServerSocketManager';

class ServerSocketManager {

	constructor(httpServer, bulletDB) {
		this.io = socketio(httpServer);
	}

	initSocket() {
		var io = this.io;
		io.on('connection', function(socket){
		  console.log('a user connected');
		  // socket.join();

		  socket.on('disconnect', function() {
		  	console.log('user disconnected');
		  });

		  ss(socket).on(EVENT.VIDEO_UPLOAD, function(stream, data) {
		    console.log('TAG: ' + data.name);
  			var size = 0;
  			stream.on('data', function(chunk) {
  				size += chunk.length;
  				if(size === data.size) {
  					io.emit(EVENT.DONE_UPLOADING, "");
  				}
  			});
			});
		});
	}
}


module.exports = ServerSocketManager;

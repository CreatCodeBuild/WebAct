function SocketioServerManager() {
  console.log('SocketioServerManager module');

  var fs = require('fs');
  const socketio = require('socket.io');
  var ss = require('socket.io-stream');


  var EVENT;
  var emitter;


  const TAG = 'SocketioServerManager';

	var httpServer;
	var io;
	var ssSocket;
	var initialized = false;

	function init(server, eventManager) {
		console.log(TAG, 'init everything');
		httpServer = server;
    EVENT = eventManager.EVENT;
    emitter = eventManager.emitter;
		io = socketio(server);
		registerEvents();
	}

	function registerEvents() {
    console.log(TAG, 'start to registerEvents');
		io.on('connection', function(socket) {
			console.log(TAG, 'on connection');
			ssSocket = ss(socket);
			initialized = true;
			// todo:
			// need to document that stream and additionalData are
			// in below callback function
			ssSocket.on(EVENT.FILE_UPLOAD, function(stream, additionalData) {
				console.log(TAG, 'on EVENT.FILE_UPLOAD');
				var bufferArray = [];
				var totalLength = 0;
				stream.on('data', function(data) {
					console.log(TAG, 'on data:', data.length);
					totalLength += data.length;
					bufferArray.push(data);
				});
				stream.on('end', function() {
					console.log(TAG, 'on end');
					console.log(TAG, 'bufferArray.length:', bufferArray.length);
					console.log(TAG, '       totalLength:', totalLength);
					emitter.emit(EVENT.RECEIVED_FILE_FROM_BROWSER, bufferArray);
				});
			});
		});
	}

	function send_image_to_browser(dataToSend) {
		if(initialized) {
			ssScoket.emit('profile-image', stream, {name: filename});
			fs.createReadStream(filename).pipe(stream);
		} else {
			console.log(TAG, 'not initialized');
		}
	}

	let publicAPI = {
		init: init,
		send_image_to_browser: send_image_to_browser
	};


  console.log('SocketioServerManager module end');
	return publicAPI;
}


module.exports.publicAPI = SocketioServerManager();

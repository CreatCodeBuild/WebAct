class SocketioServerManager {
	static init(server) {
		console.log('make io from server');
		var io = require('socket.io')(server);
		// console.log('require io-stream');
		// var ss = require('socket.io-stream');

		const TAG = 'SocketioServerManager';
		const EVENT = {
			FILE_UPLOAD: 'file upload',
			DONE_UPLOAD: 'done upload'
		}

		console.log('init everything');
		io.on('connection', function(socket) {
			console.log('on connection');
			// ss(socket).on(EVENT.FILE_UPLOAD, function(stream, data) {
			// 	console.log('on EVENT.FILE_UPLOAD');
			// });
		});
	}

	// init_socket() {
	// 	console.log('init_socket');
	// 	var io = this.io;
	// 	io.on('connection', function(socket){
	// 	  console.log('a user connected');
	// 	  socket.join();
	//
	// 	  // socket.on('disconnect', function() {
	// 	  // 	console.log('user disconnected');
	// 	  // });
	//
	// 	  ss(socket).on(EVENT.FILE_UPLOAD, function(stream, data) {
	// 	    console.log('TAG: ', 'on EVENT.FILE_UPLOAD');
  // 			// var size = 0;
  // 			// stream.on('data', function(chunk) {
  // 			// 	size += chunk.length;
  // 			// 	if(size === data.size) {
  // 			// 		io.emit(EVENT.DONE_UPLOADING, "");
  // 			// 	}
  // 			// });
	// 		});
	// 	});
	// 	console.log('end init_socket');
	// }
}


module.exports = SocketioServerManager;


// {
//   // need to implement this part later
//   var zerorpc = require('zerorpc');
//   var zerorpcClient = new zerorpc.Client();
//   zerorpcClient.connect('tcp://127.0.0.1:8888')
// }

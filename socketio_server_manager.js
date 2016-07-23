var fs = require('fs')

const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload'
}

class SocketioServerManager {
	static init(server) {
		console.log('make io from server');
		var io = require('socket.io')(server);
		console.log('require io-stream');
		var ss = require('socket.io-stream');

		const TAG = 'SocketioServerManager';
		const EVENT = {
			FILE_UPLOAD: 'file upload',
			DONE_UPLOAD: 'done upload'
		}

		console.log('init everything');
		io.on('connection', function(socket) {
			console.log('on connection');
			ss(socket).on(EVENT.FILE_UPLOAD, function(stream, data) {
				console.log('on EVENT.FILE_UPLOAD');
				stream.pipe(fs.createWriteStream('temp.jpg'));
			});
		});
	}
}


module.exports = SocketioServerManager;


// {
//   // need to implement this part later
//   var zerorpc = require('zerorpc');
//   var zerorpcClient = new zerorpc.Client();
//   zerorpcClient.connect('tcp://127.0.0.1:8888')
// }

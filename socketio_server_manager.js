var fs = require('fs')
var io = require('socket.io')(server);
var ss = require('socket.io-stream');


const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload',
	PROCESSED_IMAGE: 'processed image'
}

const TAG = 'SocketioServerManager';
class SocketioServerManager {
	static init(server) {
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

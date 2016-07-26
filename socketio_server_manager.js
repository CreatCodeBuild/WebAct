var fs = require('fs')
var zeroClient = require('./rpc')


const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload',
	PROCESSED_IMAGE: 'processed image'
}

const TAG = 'SocketioServerManager';
class SocketioServerManager {
	static init(server) {
		var io = require('socket.io')(server);
		var ss = require('socket.io-stream');
		console.log('init everything');
		io.on('connection', function(socket) {
			console.log('on connection');
			// todo:
			// need to document that stream and additionalData are
			// in below callback function
			ss(socket).on(EVENT.FILE_UPLOAD, function(stream, additionalData) {
				console.log('on EVENT.FILE_UPLOAD');
				//need to figure out the actually api use
				//zero rpc might be a great idea
				//need to figure out the stream api first
				// stream.pipe(fs.createWriteStream('temp.jpg'));
				var bufferArray = [];
				stream.on('data', function(data) {
					console.log(data.length);
					bufferArray.push(data);
				})
				stream.on('end', function() {
					console.log(bufferArray.length);
					zeroClient.process_image(bufferArray, function(result) {
						console.log('got a result');
					});
				})
			});
		});
	}
}


module.exports = SocketioServerManager;

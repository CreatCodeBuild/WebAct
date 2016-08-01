var fs = require('fs');
var zeroClient = require('./rpc');
const myEvent = require('./events');

EVENT = myEvent.EVENT;
emitter = myEvent.emitter;


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
				var totalLength = 0;
				stream.on('data', function(data) {
					totalLength += data.length;
					console.log('on data:', data.length);
					bufferArray.push(data);
				});
				stream.on('end', function() {
					console.log('on end:', bufferArray.length);
					console.log('on end:', totalLength);
					emitter.emit(EVENT.RECEIVED_FILE_FROM_BROWSER, bufferArray);
				});
			});
		});
	}
}


module.exports = SocketioServerManager;

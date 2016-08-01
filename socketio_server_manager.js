var fs = require('fs');
var zeroClient = require('./rpc');
const Event = require('./events')





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
					let results = [];
					zeroClient.process_image(bufferArray, function(error, result, more) {
						console.log(' error type:', typeof error);
						console.log('result type:', typeof result);
						console.log('  more type:', typeof more);
						if(result === undefined) { //error
							console.log(error);
							//emit a event with bytes
							//need to use NodeJS Event Emitter or something
							//after emit this event, handle this event
							//send back bytes to browser end
							//socketioEventEmitter.emit(EVENT.PROCESSED_IMAGE, bytes);
						} else {
							// console.log(typeof result);
							console.log(error);
							console.log(result.length);
							let size = 0;
							for(let i = 0; i < result.length; i++) {
								size += result[i].length;
								console.log(result[i].length);
							}
							console.log('total size:', size);
							console.log(more.length);
							results.push(result);
						}
					});
				});
			});
		});
	}
}


module.exports = SocketioServerManager;

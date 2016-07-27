var fs = require('fs');
var zeroClient = require('./rpc');
const EventEmitter = require('events');

const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload',
	PROCESSED_IMAGE: 'processed image'
};


class SocketioEventEmitter extends EventEmitter {}

const socketioEventEmitter = new SocketioEventEmitter();
socketioEventEmitter.on(EVENT.PROCESSED_IMAGE, function(bytes) {
	//send bytes back to browser
	//todo: implement it
	//check out the socketio and socket stream api
	//probably a change to refine the code
});


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
				});
				stream.on('end', function() {
					console.log(bufferArray.length);
					let results = [];
					zeroClient.process_image(bufferArray, function(error, result) {
						// console.log(typeof result);
						if(result === undefined) {
							console.log(results.length);
							let res = results.join('');
							console.log('result string length:', res.length);
							console.log('process_image end');

							//convert string to blob
							let bytes = new Uint8Array(res.length);
							for(let i = 0; i < res.length; i++) {
								bytes[i] = res.charCodeAt(i);
							}

							//emit a event with bytes
							//need to use NodeJS Event Emitter or something
							//after emit this event, handle this event
							//send back bytes to browser end
							socketEventEmitter.emit(EVENT.PROCESSED_IMAGE, bytes);
						} else {
							// console.log(typeof result);
							results.push(result);
						}
					});
				});
			});
		});
	}
}


module.exports = SocketioServerManager;

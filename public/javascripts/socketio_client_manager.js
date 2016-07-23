const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload',
	PROCESSED_IMAGE: 'processed image'
}

var socket = io.connect('http://localhost:8080');

/* Client Socket Manager */
class SocketioClientManager {

	static emit_file_stream(file) {
		console.log('emit_file_stream');
		var stream = ss.createStream();
    // upload a file to the server.
    ss(socket).emit(EVENT.FILE_UPLOAD, stream, {size: file.size});
    ss.createBlobReadStream(file).pipe(stream);
	}

	/*
		register all on-event callbacks
	*/
	static init() {
		socket.on(EVENT.DONE_UPLOADING, function() {
			// todo: implement it
			console.log('EVENT.DONE_UPLOADING');
		});

		socket.on(EVENT.PROCESSED_IMAGE, function() {
			// todo: implement it
			console.log('EVENT.PROCESSED_IMAGE');
		})
	}

}

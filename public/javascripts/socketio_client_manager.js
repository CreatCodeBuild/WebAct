const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload'
}


/* Client Socket Manager */
class SocketioClientManager {

	constructor() {
		this.socket = io();
	}

	emit_video_stream(file) {
		var stream = ss.createStream();
    // upload a file to the server.
    ss(this.socket).emit(
      EVENT.FILE_UPLOAD,
      stream,
      {
        size: file.size,
        name: file.name
      }
    );
    var blobStream = ss.createBlobReadStream(file);

    //track progress
    var size = 0;
    blobStream.on('data', function(chunk) {
        size += chunk.length;
        console.log(Math.floor(size / file.size * 100) + '%');
    });

    blobStream.pipe(stream);
	}

	on_done_upload(callback) {
		this.socket.on(EVENT.DONE_UPLOADING, callback);
	}

}

const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload'
}


/* Client Socket Manager */
class SocketManager {

	constructor() {
		this.socket;
	}

	initSocket() {
		this.socket = io();
	}

	emitVideoStream(file) {
		var stream = ss.createStream();
        // upload a file to the server.
        ss(this.socket).emit(EVENT.VIDEO_UPLOAD, stream, {size: file.size, name: file.name});
        var blobStream = ss.createBlobReadStream(file);

        //track progress
        var size = 0;
        blobStream.on('data', function(chunk) {
            size += chunk.length;
            console.log(Math.floor(size / file.size * 100) + '%');
            if(size === file.size) {
            	$('#upload_video').html(
		        	"<a>" +
		          		"<span class='mif-cloud-upload icon'></span>" +
		            	" Upload Video" +
		        	"</a>"
		      	);
            }
        });

        blobStream.pipe(stream);
	}

	onDoneUploading(callback) {
		this.socket.on(EVENT.DONE_UPLOADING, callback);
	}

}

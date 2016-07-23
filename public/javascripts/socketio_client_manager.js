const EVENT = {
	FILE_UPLOAD: 'file upload',
	DONE_UPLOAD: 'done upload'
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

	// emit_video_stream(file) {
	// 	console.log('begin emit_video_stream');
	// 	var stream = ss.createStream();
	// 	console.log('var stream = ss.createStream();');
  //   // upload a file to the server.
  //   ss(this.socket).emit(
  //     EVENT.FILE_UPLOAD,
  //     stream,
  //     {
  //       size: file.size,
  //       name: file.name
  //     }
  //   );
  //   var blobStream = ss.createBlobReadStream(file);
	// 	blobStream.pipe(stream);
	//
  //   //track progress
  //   // var size = 0;
  //   // blobStream.on('data', function(chunk) {
  //   //     size += chunk.length;
  //   //     console.log(Math.floor(size / file.size * 100) + '%');
  //   // });
	//
	//
	//
	// 	var stream = ss.createStream();
	// 	// upload a file to the server.
	// 	ss(socket).emit('file', stream, {size: file.size});
	// 	ss.createBlobReadStream(file).pipe(stream);
	//
	// 	console.log('end emit_video_stream');
	// }

	on_done_upload(callback) {
		this.socket.on(EVENT.DONE_UPLOADING, callback);
	}

}

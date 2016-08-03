socketioManager = (function SocketioClientManager() {
	var TAG = 'SocketioClientManager';

	var EVENT = {
		FILE_UPLOAD: 'file upload', //need change to 'uploading file'
		DONE_UPLOAD: 'done upload',
		RECEIVED_FILE_FROM_BROWSER: 'received file from browser',
		PROCESSED_IMAGE: 'processed image',
		SEND_IMAGE_TO_PYTHON: 'send image to python',
		RECEIVED_IMAGE_FROM_PYTHON: 'received image from python',
		SEND_IMAGE_TO_BROWSER: 'send image to browser'
	};

	var socket = io.connect('http://localhost:8080');
	var ssSocket = ss(socket);

	/* Client Socket Manager */
	function emit_file_stream(file) {
		console.log('emit_file_stream, upload a file to the server.');
		var stream = ss.createStream();
		ssSocket.emit(EVENT.FILE_UPLOAD, stream, {size: file.size});
    ss.createBlobReadStream(file).pipe(stream);
	}

	/*
		register all on-event callbacks
	*/
	function init() {
		socket.on(EVENT.DONE_UPLOADING, function() {
			// todo: implement it
			console.log('EVENT.DONE_UPLOADING');
		});

		socket.on(EVENT.PROCESSED_IMAGE, function() {
			// todo: implement it
			console.log('EVENT.PROCESSED_IMAGE');
		});

		socket.on(EVENT.SEND_IMAGE_TO_BROWSER, function(receivedData) {
			var buffer = receivedData.data;
			var totalLength = buffer.length;

			console.log(TAG, EVENT.SEND_IMAGE_TO_BROWSER);
			console.log(TAG, 'typeof buffer', typeof buffer);
			console.log(TAG, '  totalLength', totalLength);

			function download(filename, text) {
				var pom = document.createElement('a');
				pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
				pom.setAttribute('download', filename);

				if (document.createEvent) {
					var event = document.createEvent('MouseEvents');
					event.initEvent('click', true, true);
					pom.dispatchEvent(event);
				}
				else {
					pom.click();
				}
			}

			//todo: construct a image from bufferArray
			var imageBlob = new Blob([buffer]);
			var imageElement = document.getElementById('ocr');
			imageElement.src = URL.createObjectURL(imageBlob);
			//download('test.txt', buffer);
		});
	}

	init();

	return {
		emit_file_stream: emit_file_stream
	}
})();

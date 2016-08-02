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

		ssSocket.on(EVENT.SEND_IMAGE_TO_BROWSER, function(stream, additionalData) {
			console.log(TAG, EVENT.SEND_IMAGE_TO_BROWSER);
			console.log(TAG, '        typeof stream', typeof stream);
			console.log(TAG, 'typeof additionalData', typeof additionalData);

			var totalLength = 0;
			var bufferArray = [];

			stream.on('data', function(data) {
				console.log(TAG, 'on data:', data.length);
				totalLength += data.length;
				bufferArray.push(data);
			});

			stream.on('end', function() {
				console.log(TAG, 'on end');
				console.log(TAG, 'bufferArray.length:', bufferArray.length);
				console.log(TAG, '       totalLength:', totalLength);

				//todo: construct a image from bufferArray
				var buffer = bufferArray.join('');
				var imageBlob = new Blob(buffer, {type: 'image/jpeg'});
				var imageElement = document.getElementById('ocr');
				imageElement.src = URL.createObjectURL(imageBlob);
			});
		});
	}

	init();

	return {
		emit_file_stream: emit_file_stream
	}
})();

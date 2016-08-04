function IOFormater() {

  var TAG = 'IOFormater';

  var fs = require('fs');

  function array_to_string(array) {

  }

  function array_to_buffer(array) {
    //var arrayLength = array.length;
    //var byteSize = 0;
    //var i;
    //var bufferArray = [];
    //for(i = 0; i < array.length; i++) {
    //  let buffer = Buffer.from(array[i], 'binary');
    //  byteSize += buffer.length;
    //  bufferArray.push(buffer); //I want to cry when I write this line
    //}
    //var newBuffer = Buffer.concat(bufferArray);
    //console.log(TAG, array[arrayLength-1234].charCodeAt(0), newBuffer[arrayLength-1234]);
    //
    //console.log(TAG, 'arrayLength:', arrayLength);
    //console.log(TAG, '   byteSize:', byteSize);

    var newBuffer = Buffer.from(array, 'binary');
    fs.writeFileSync('temp.hex', newBuffer);

    return newBuffer;
  }

  function buffer_to_array() {

  }

  function buffer_to_string() {

  }

  return {
    array_to_string: array_to_string,
    array_to_buffer: array_to_buffer
  };
}

module.exports = IOFormater();

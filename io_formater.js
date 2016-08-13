/*
  
 */
function IOFormater() {

  var TAG = 'IOFormater';

  var fs = require('fs');

  function array_to_string(array) {

  }

  function array_to_buffer(array) {
    var newBuffer = Buffer.from(array, 'binary');
    // fs.writeFileSync('temp.hex', newBuffer); // 仅调试
    return newBuffer;
  }

  function buffer_to_array() {
    // to be implemented
  }

  function buffer_to_string() {
    // to be implemented
  }

  return {
    array_to_string: array_to_string,
    array_to_buffer: array_to_buffer
  };
}

module.exports = IOFormater();

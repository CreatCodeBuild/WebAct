let FileItTag = 'FileIt::';
class FileIt {
  /*
  @file: blob
  @rest_api_route: string
  @server_response_callback: function(error, response)
  */
  static send_file_http(file, rest_api_route, server_response_callback) {
    let request = new XMLHttpRequest();
    if (!request) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          console.log(request.responseType);
          console.log(request.response);
          server_response_callback(undefined, response);
        } else {
          console.log('There was a problem with the request.', 'request.status:', request.status);
          server_response_callback('request.status is not 200. It is '+request.status, response);
        }
      }
    }
    request.open('POST', rest_api_route, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);
  }

  static send_file_socketio() {
    //todo: implemented
  }
}

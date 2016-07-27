function process_image() {
  let img = new Image();
  img.src = document.getElementById('ocr').src;
  console.log(img);
  img.onload = function() {
    Tesseract.recognize(img,
                        {
                          progress: function(e){
                            console.log(e)
                          },
                          lang: 'chi_sim'
                        }
    ).then(function(d) {
      document.getElementById('display').innerHTML += d.text;
    });
  }
}

function set_image_view(url) {
  let imageElement = document.getElementById('ocr');
  imageElement.src = url;
}

window.onload = function() {
  console.log('window.onload');

  //todo: implement it
  function about_button_listener() {

  }

  let element = document.getElementById('select_file');

  Inputs.select_file(element, function(err, file, url) {
    if(err === undefined) {
      console.log(file, file.size);
      set_image_view(url);
      // process_image();

      let socketioClientManager = new SocketioClientManager();
      console.log('let socketioClientManager = new SocketioClientManager()');
      SocketioClientManager.emit_file_stream(file);
      console.log('done?!');

      // FileIt.send_file_http(file, '/image_process', function(err, response) {
      //   if(err === undefined) {
      //     let processedImageUrl = URL.createObjectURL(new File(response));
      //     let imageElement = document.getElementById('img2');
      //     imageElement.src = processedImageUrl;
      //   } else {
      //     console.log(err, response);
      //   }
      // });
    } else {
      console.log(err);
    }
  });
}

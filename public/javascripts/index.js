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
  let element = document.getElementById('select_file');

  Inputs.select_file(element, function(err, file, url) {
    if(err === undefined) {
      console.log(file, url);
      set_image_view(url);
      process_image();
    } else {
      console.log(err);
    }
  });
}

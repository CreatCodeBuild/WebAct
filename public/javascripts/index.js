function init() {
  var img = new Image();
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
      ).then( function(d){ document.getElementById('display').innerHTML+=d.text } )
  }
}

window.onload = function() {
  console.log('window.onload')
  init();
}

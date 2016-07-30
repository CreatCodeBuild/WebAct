window.onload = function() {
  console.log('window.onload');

  /* function declaretions 函数声明 */
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

  //todo: implement it
  function about_button_listener() {

  }

  /* function declaretions end 函数声明结束 */

  /* variable declarations and assignments 变量声明和赋值 */
  let element = document.getElementById('select_file');

  /* variable declarations and assignments end 变量声明和赋值结束 */

  /* start 开始 */
  Inputs.select_file(element, function(err, file, url) {
    if(err === undefined) {
      console.log(file, file.size);
      set_image_view(url);
      // process_image();

      //todo: implement this
      //compress the iamge
      //first get the image element
      //second call JIC api

      let socketioClientManager = new SocketioClientManager();
      console.log('let socketioClientManager = new SocketioClientManager()');
      SocketioClientManager.emit_file_stream(file);
      console.log('done?!');
    } else {
      console.log(err);
    }
  });
}

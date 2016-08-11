window.onload = function() {
  console.log('window.onload');

  function template(inputString) {
    var keyWords = [
      '工程名称',
      '建设地址',
      '建设单位',
      '监理单位',
      '总包单位',
      '工程类别',
      '建筑面积',
      '开工日期',
      '竣工日期',
      '设计单位',
      '受监单位名称',
      '收件单位电话',
      '项目经理姓名',
      '项目经理手机',
      '文明施工管理员姓名',
      '文明施工管理员手机'
    ];
    var content = [];
  }

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
    imageElement.onload = function() {
      console.log(this.naturalHeight);
    };
    imageElement.src = url;
  }

  //todo: implement it
  function about_button_listener() {

  }

  function file_to_buffer(file) {
    var fileReader = new FileReader();
    var arrayBuffer = fileReader.readAsArrayBuffer(file);
    return fileReader;
  }

  /* function declaretions end 函数声明结束 */

  /* variable declarations and assignments 变量声明和赋值 */
  let element = document.getElementById('select_file');

  /* variable declarations and assignments end 变量声明和赋值结束 */

  /* start 开始 */
  inputs.select_file(element, function(err, file, url) {
    if(err === undefined) {
      console.log(file);
      set_image_view(url);
      // process_image();

      let fileReader = file_to_buffer(file);
      fileReader.onloadend = function() {
        console.log(fileReader.result.byteLength);
        var text = fileReader.result;
        var huffman = Huffman.treeFromText(text); // first we need to create the tree to make encoding/decoding
        var encoded = huffman.encode(text); // will return the compressed version of text
        console.log(encoded.length);
        var decoded = huffman.decode(encoded); // will decode text to original version
      };

      //todo: implement this
      //compress the iamge
      //first get the image element
      //second call JIC api
      //let imageElement = document.getElementById('ocr');

      // warning!: there is a bug that naturalWidth
      // and naturalHeight could be 0, please refer to
      // https://developer.mozilla.org/en/docs/Web/API/HTMLImageElement
      //let resultImageObject = jic.compress(imageElement, 50, 'jpg');
      //console.log(resultImageObject.naturalWidth, resultImageObject.naturalHeight);
      //set_image_view(resultImageObject.src);

      //socketioManager.emit_file_stream(file);
      console.log('done?!');
    } else {
      console.log(err);
    }
  });
};

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
          server_response_callback(undefined, request.response);
        } else {
          console.log('There was a problem with the request.', 'request.status:', request.status);
          server_response_callback('request.status is not 200. It is '+request.status, request.response);
        }
      }
    };
    request.open('POST', rest_api_route, true);
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    request.send({'file': file});
    // let reader = new FileReader()
    // reader.onloadend = function() {
    //   console.log(reader.result.byteLength)
    //   ;
    // }
    // reader.readAsArrayBuffer(file);
  }

  static send_file_socketio() {
    //todo: implemented
  }
}


var inputs = (function Inputs() {
  let InputsTag = 'Inputs::';

  function select_file(element, on_file_selected) {
    element.addEventListener('change', function(event) {
      console.log(InputsTag, event);
      let file = event.target.files[0];
      let error = undefined;
      let url;
      if(file) {
        console.log(InputsTag+file.name);
        url = URL.createObjectURL(file);
      } else {
        error = 'no file is selected';
      }
      console.log(InputsTag+'end');
      on_file_selected(error, file, url);
    });
  }

  return {
    select_file: select_file
  }
})();


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

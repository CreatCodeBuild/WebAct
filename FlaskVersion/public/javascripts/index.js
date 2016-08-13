
function WebAct() {
  /*
   @file: blob
   @rest_api_route: string
   @server_response_callback: function(error, response)
   */
  function send_binary_data(binaryData, rest_api_route, server_response_callback) {
    $.ajax({
      method: "POST",
      url: rest_api_route,
      data: { binaryData: binaryData }
    })
    .done(server_response_callback);
  }

  function file_to_buffer(file, callback) {
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = callback;
  }

  function select_file(element, on_file_selected) {
    element.addEventListener('change', function(event) {
      console.log('select_file', event);
      let file = event.target.files[0];
      let error = undefined;
      let url;
      if(file) {
        console.log('select_file', file.name);
        url = URL.createObjectURL(file);
      } else {
        error = 'no file is selected';
      }
      console.log('select_file', 'end');
      on_file_selected(error, file, url);
    });
  }

  //function template(inputString) {
  //  var keyWords = [
  //    '工程名称',
  //    '建设地址',
  //    '建设单位',
  //    '监理单位',
  //    '总包单位',
  //    '工程类别',
  //    '建筑面积',
  //    '开工日期',
  //    '竣工日期',
  //    '设计单位',
  //    '受监单位名称',
  //    '收件单位电话',
  //    '项目经理姓名',
  //    '项目经理手机',
  //    '文明施工管理员姓名',
  //    '文明施工管理员手机'
  //  ];
  //  var content = [];
  //}

  return {
    select_file: select_file,
    send_binary_data: send_binary_data,
    file_to_buffer: file_to_buffer
  }
}


window.onload = function Main() {
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
    imageElement.onload = function() {
      console.log('set_image_view', this.naturalHeight);
    };
    imageElement.src = url;
  }
  /* function declaretions end 函数声明结束 */



  /* variable declarations and assignments 变量声明和赋值 */
  let element = document.getElementById('select_file');
  let webAct = WebAct();
  /* variable declarations and assignments end 变量声明和赋值结束 */



  /* start 开始 */
  webAct.select_file(element, function(err, file, url) {
    if(err === undefined) { //如果没有出错
      console.log(file);
      set_image_view(url);
      // process_image();

      webAct.file_to_buffer(file, function() {
        console.log('file_to_buffer', this.result.byteLength);
        var text = this.result;

        //todo: compress the image

        //send image
        webAct.send_binary_data(text, 'image', function( response ) {
          console.log( "Data Saved: " + response );
        });
      });

    } else {
      console.log(err);
    }
  });
};

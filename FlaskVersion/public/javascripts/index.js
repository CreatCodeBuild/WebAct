
function WebAct() {
  /*
   @file: blob
   @rest_api_route: string
   @server_response_callback: function(error, response)
   */
  function send_binary_data(binaryData, rest_api_route, server_response_callback) {
    console.log('send_binary_data', binaryData.length);
    $.ajax({
      type: "POST",
      url: rest_api_route,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({ binaryData: binaryData }),
      success: server_response_callback
    });
  }

  function file_to_buffer(file, callback) {
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = callback;
  }

  function read_file_as_test(file, callback) {
    var fileReader = new FileReader();
    fileReader.readAsText(file);
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

  function image_compression(source_img_obj, quality, output_format){

    var mime_type = "image/jpeg";
    if(typeof output_format !== "undefined" && output_format=="png"){
      mime_type = "image/png";
    }

    var cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    console.log('image compress', cvs.width, cvs.height);
    var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality/100);
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
  }

  return {
    select_file: select_file,
    send_binary_data: send_binary_data,
    file_to_buffer: file_to_buffer,
    read_file_as_test: read_file_as_test,
    compress_image: image_compression
  }
}


window.onload = function Main() {
  console.log('window.onload');

  /* function declaretions 函数声明 */



  function process_image(imgSrc) {
    console.log('process_image');
    let newImage = new Image();
    newImage.src = imgSrc;

    newImage.onload = function() {
      Tesseract.recognize(newImage, {progress: function(e){console.log(e)},lang: 'chi_sim'})
          .then(function(d) {
            document.getElementById('display').innerHTML += d.text;
          });
    }
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  function compressed_image_onload() {
    //this should be the compressed result image
    var compressedFile = dataURItoBlob(this.src);
    console.log(compressedFile);
    //process_image(this.src);
  }

  function image_element_onload() {
    console.log('image_element_onload');

    var resultImage = webAct.compress_image(document.getElementById('ocr'), 1);
    resultImage.onload = compressed_image_onload;
    //今天就到这里，明天要连接前端后端，2016/08/14 21:40
  }

  function set_image_view(url) {
    let imageElement = document.getElementById('ocr');
    imageElement.onload = image_element_onload;
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

      webAct.read_file_as_test(file, function() {
        //console.log('file_to_buffer', this.result.byteLength);
        var text = this.result;

        //todo: compress the image


        //send image
        webAct.send_binary_data(text, 'image', function( response ) {
          //console.log( "Data Saved: " + JSON.parse(response) );
        });
      });

    } else {
      console.log(err);
    }
  });
};

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

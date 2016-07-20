let InputsTag = 'Inputs::';
class Inputs {
  static select_file(element, on_file_selected) {
    element.addEventListener('change', function(event) {
      let file = event.target.files[0];
      let error = undefined;
      let url;
      if(file) {
        console.log(InputsTag+file.name);
        url = URL.createObjectURL(file);
      } else {
        error = 'no file is selected';
      }
      on_file_selected(error, file, url);
    });
  }
}

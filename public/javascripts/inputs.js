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

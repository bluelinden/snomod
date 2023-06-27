import {on, trigger} from 'jquery';

$('body').on('click', '.convert-template', function() {
  $('#sno_convert_template').trigger('click');
  if( $('#input#save-post').length ) {
      $('input#save-post').trigger('click');
  } else {
      $('input#publish').trigger('click');
  }
})
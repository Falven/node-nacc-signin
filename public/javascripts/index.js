/**
 * Created by falven on 4/26/16.
 */
var NACC = {
  index: {
      init: function(element) {
          new KeypadController(
            document.getElementsByClassName('text-input'),
            document.getElementsByClassName('numeric'),
            document.getElementsByClassName('reset'),
            9
          );
      }
  },
  admin: {
    init: function(element) {
        new KeypadController(
          document.getElementsByClassName('keypad-form-display'),
          document.getElementsByClassName('numeric'),
          document.getElementsByClassName('reset'),
          4
        );
    }
  },
  dashboard: {
    init: function(element) {
      if(window.jQuery) {
        new EditableTableController(
          '#tutors-table',
          '/admin/dashboard/tutors',
          'Tutors sucessfully updated!',
          'Failed to update Tutors.'
        );
        new EditableTableController(
          '#mentors-table',
          '/admin/dashboard/mentors',
          'Mentors sucessfully updated!',
          'Failed to update Mentors.'
        );
      }
    }
  },
  mailto: {
      init: function(element) {
          var email = {
              part1: 'mail',
              part2: 'to',
              part3: ':',
              part4: 'falven',
              part5: '@',
              part6: 'rams.',
              part7: 'colostate',
              part8: '.',
              part9: 'ed',
              part10: 'u',
              part11: '?Sub',
              part12: 'ject',
              part13: '=NACC',
              part14: '%20',
              part15: 'Login'
          };
          element.href = email.part1 + email.part2 + email.part3 + email.part4 + email.part5 + email.part6 + email.part7 + email.part8 + email.part9 + email.part10 + email.part11 + email.part12 + email.part13 + email.part14 + email.part15;
      }
  }
};

var UTIL = {
    fire: function(elementId) {
        var element = document.getElementById(elementId);
        if(element) {
            NACC[elementId].init(element);
        }
    },
    init: function() {
        UTIL.fire('index');
        UTIL.fire('admin');
        UTIL.fire('dashboard');
        UTIL.fire('mailto');
    }
};

function domLoaded() {
    UTIL.init();
}

document.addEventListener("DOMContentLoaded", domLoaded);
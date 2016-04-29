/**
 * Created by falven on 4/26/16.
 */

UTIL = {
    fire: function(func, funcName, args) {
        var namespace = NACC;
        funcName = (funcName === undefined) ? 'init' : funcName;
        if(func !== '' && namespace[func] && typeof namespace[func][funcName] === 'function') {
            namespace[func][funcName](args);
        }
    },

    loadEvents : function() {
        var bodyId = document.body.id;
        UTIL.fire('common');
        UTIL.fire(bodyId);
    }
};

NACC = {
    common : {
    },
    index : {
        init : function() {
            new KeypadController(
                document.getElementsByClassName('display'),
                document.getElementsByClassName('numeric'),
                document.getElementsByClassName('reset'),
                9
            );
        }
    },
    admin : {

    }
};

function injectEmail() {
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
    var mailto = document.getElementById('mailto');
    mailto.href = email.part1 + email.part2 + email.part3 + email.part4 + email.part5 + email.part6 + email.part7 + email.part8 + email.part9 + email.part10 + email.part11 + email.part12 + email.part13 + email.part14 + email.part15;
}

function domLoaded() {
    UTIL.loadEvents();
    injectEmail();
}

document.addEventListener("DOMContentLoaded", domLoaded);
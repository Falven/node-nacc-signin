/**
 * Created by falven on 4/26/16.
 */
function domLoaded() {
    if(document.getElementById('index')) {
        new KeypadController(
            document.getElementsByClassName('text-input'),
            document.getElementsByClassName('numeric'),
            document.getElementsByClassName('reset'),
            9
        );
    } else {
        if(document.getElementById('admin')) {
            new KeypadController(
                document.getElementsByClassName('display'),
                document.getElementsByClassName('numeric'),
                document.getElementsByClassName('reset'),
                4
            );
        }
    }
    var mailTo = document.getElementById('mailto');
    if(mailTo) {
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
        mailTo.href = email.part1 + email.part2 + email.part3 + email.part4 + email.part5 + email.part6 + email.part7 + email.part8 + email.part9 + email.part10 + email.part11 + email.part12 + email.part13 + email.part14 + email.part15;
    }
}

document.addEventListener("DOMContentLoaded", domLoaded);
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
    peers : {
        init : function() {
            new ReasonController(
                document.getElementsByClassName('tutoring')[0],
                document.getElementsByClassName('mentoring')[0],
                document.getElementsByClassName('printing')[0],
                document.getElementsByClassName('peers')[0]
            );
        }
    },
    admin : {

    }
};

function domLoaded() {
    UTIL.loadEvents();
}

document.addEventListener("DOMContentLoaded", domLoaded);
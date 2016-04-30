/**
 * Created by falven on 4/26/16.
 */
function KeypadController(displays, numerals, resets, maxChars) {

    var i;
    if(numerals) {
        for(i = 0; i < numerals.length; ++i) {
            numerals[i].addEventListener("click", numeralKeyClicked, false);
        }
    }
    if(resets) {
        for(i = 0; i < resets.length; ++i) {
            resets[i].addEventListener("click", resetKeyClicked, false);
        }
    }
    
    function numeralKeyClicked(event) {
        if(displays) {
            for (var i = 0; i < displays.length; ++i) {
                var display = displays[i];
                if(display.value.length < maxChars) {
                    display.value += event.target.value;
                }
            }
        }
    }

    function resetKeyClicked() {
        if(displays) {
            for (var i = 0; i < displays.length; ++i) {
                displays[i].value = "";
            }
        }
    }
}
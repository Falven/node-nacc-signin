/**
 * Created by falven on 4/26/16.
 */
document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    new KeypadController(
        document.getElementsByClassName('display'),
        document.getElementsByClassName('numeric'),
        document.getElementsByClassName('reset'),
        9
    );
}
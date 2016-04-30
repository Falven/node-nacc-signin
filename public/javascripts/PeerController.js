function ReasonController(tutoringButton, mentoringButton, printingButton, table) {
    var tableHidden = true,
        tableOwner;

    if(null != tutoringButton) {
        tutoringButton.addEventListener("click", tutoringButtonClicked, false);
    }

    if(null != mentoringButton) {
        mentoringButton.addEventListener("click", mentoringButtonClicked, false);
    }

    if(null != printingButton) {
        printingButton.addEventListener("click", printingButtonClicked, false);
    }

    function ajaxRequestPeer(peer) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if(tableOwner !== peer) {
                    clearTable();
                    populateTableHeader(peer);
                    populateTable(peer, JSON.parse(xhttp.responseText));
                    tableOwner = peer;
                }
            }
        };
        xhttp.open('POST', '/peers', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send('peer=' + peer);
    }

    function clearTable() {
        var length = table.rows.length;
        while(length-- > 0) {
            table.deleteRow(0);
        }
    }

    function populateTableHeader(peer) {
        var row = table.createTHead().insertRow(0);
        row.insertCell(0).innerHTML = 'Name';
        if(peer === 'Tutoring') {
            row.insertCell(1).innerHTML = 'Subject';
        }
    }

    function populateTable(peer, peerArray) {
        var key, row;
        var tbody = table.getElementsByTagName('tbody')[0];
        for (key in peerArray) {
            if (peerArray.hasOwnProperty(key)) {
                row = tbody.insertRow(-1);
                row.addEventListener('click', onRowClick, false);
                if(peer === 'Tutoring') {
                    row.insertCell(-1).innerHTML = key;
                }
                row.insertCell(-1).innerHTML = peerArray[key];
            }
        }
    }

    function post(path, params) {
        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", path);
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        form.submit();
    }


    function tryShowTable() {
        if(tableHidden) {
            table.style.setProperty('display', 'table', '');
            tableHidden = false;
        }
    }

    function tutoringButtonClicked(event) {
        tryShowTable();
        ajaxRequestPeer('Tutoring');
    }

    function mentoringButtonClicked(event) {
        tryShowTable();
        ajaxRequestPeer('Mentoring');
    }

    function printingButtonClicked(event) {
    }

    function onRowClick(event) {
        post('confirm', { name : event.target.innerHTML });
    }
}
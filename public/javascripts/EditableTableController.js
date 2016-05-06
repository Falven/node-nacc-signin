function EditableTableController(tableId, url, saveSuccess, saveFailure) {
  var table = $(tableId);
  var thead = table.find('thead');
  var tbody = table.find('tbody');

  table.find('.add').click(function() {
    var clone = table.find('.clone').clone(true).removeClass('clone');
    tbody.append(clone);
  });

  table.find('.remove').click(function() {
    $(this).parent().remove();
  });

  table.find('.save').click(function() {
    var headers = thead.find('.th:not(.add)');
    var rows = tbody.find('.tr:not(.clone)');
    var peers = [];
    rows.each(function() {
      var cells = $(this).find('.td:not(.remove)');
      var i = 0;
      var peer = {};
      headers.each(function() {
        peer[$(this).text()] = cells[i++].innerHTML;
      });
      peers.push(peer);
    });
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(peers),
      contentType: 'application/json',
      success: function(data) {
        window.alert(saveSuccess);
      },
      failure: function(errMsg) {
        window.alert(saveFailure);
      }
    });
  });

  table.find('.clear').click(function() {
    var clone = table.find('.clone').clone(true);
    $(tbody).empty();
    tbody.append(clone);
  });
}
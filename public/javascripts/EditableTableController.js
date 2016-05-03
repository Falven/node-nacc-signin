function EditableTableController(tableId, postUrl, success, failure) {
  var table = $(tableId);
  var thead = table.find('thead');
  var tbody = table.find('tbody');
  var information = table.find('.information');

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
        peer[$(this).text().toLowerCase()] = cells[i++].innerHTML;
      });
      peers.push(peer);
    });
    var jstring =  JSON.stringify(peers);
    $.ajax({
      type: "POST",
      url: postUrl,
      data: jstring,
      contentType: 'application/json',
      dataType: "json",
      success: function(data) {
        information.addClass('success-text');
        information.removeClass('error-text');
        information.text(success);
      },
      failure: function(errMsg) {
        information.addClass('error-text');
        information.removeClass('success-text');
        information.text(failure + "<br>" + errMsg);
      }
    });
  });
}
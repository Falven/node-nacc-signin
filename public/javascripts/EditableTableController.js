function EditableTableController(tableId) {
  var table = $(tableId);
  var saveButton = $(tableId + " .save");

  var addButton = $(tableId + " .add");

  $(tableId + " .add").click(function() {
    var clone = table.find('.clone').clone(true).removeClass('clone');
    table.find('tbody').append(clone);
  });

  $(tableId + " .remove").click(function() {
  });
}
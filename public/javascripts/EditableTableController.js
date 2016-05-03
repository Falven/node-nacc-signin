function EditableTableController(tableClass, addRowClass, removeRowClass, saveButtonClass) {
  var table = $(tableClass);
  var saveButton = $(saveButtonClass);

  $(addRowClass).click(function() {
    var clone = table.find('tr.clone').clone(true).removeClass('clone');
    table.find('tbody').append(clone);
  });

  var remove = $(removeRowClass);
  if(remove) {

  }
}
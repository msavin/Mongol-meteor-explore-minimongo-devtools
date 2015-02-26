Template.Mongol_accountViewer.helpers({
  accountData: function () {
    var docCurrent = Meteor.user(),
      json_output = JSON.stringify(docCurrent, null, 2),
      colorized = MongolPackage.colorize(json_output);
    return colorized;
  },
  editContent: function () {

    var editMode = Session.get("Mongol_editMode");

    if (editMode) {
      return "true";
    }

  },
  editStyle: function () {

    var editMode = Session.get("Mongol_editMode");

    if (editMode) {
      return "Mongol_editable";
    }

  },
  usercode: function () {
    return Meteor.userId();
  },
});

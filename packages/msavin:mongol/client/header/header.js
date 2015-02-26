Template.Mongol_header.events({
  'click': function () {
    Session.set("Mongol_currentCollection", "mongol_618");
  },
  'click .Mongol_Minimize': function () {
    Session.set("Mongol_currentCollection", null);
  }
});

Template.Mongol_header.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {
      return "Mongol_row_expand";
    }
  },
});

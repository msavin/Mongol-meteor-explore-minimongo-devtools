Template.Mongol_header.events({
  'click .Mongol_row': function () {
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {
      Session.set("Mongol_currentCollection", null);
    } else {
      Session.set("Mongol_currentCollection", "mongol_618");
    }
  },
  'click .Mongol_contentView': function (e) {
    e.stopPropagation();
  }
});

Template.Mongol_header.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {
      return "Mongol_row_expand";
    }
  }
});

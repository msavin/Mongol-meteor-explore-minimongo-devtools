Template.Mongol_collection_notFound.events({
  'click .Mongol_row': function () {
    if (Session.equals("Mongol_currentCollection", "mongol_no_collections")) {
      Session.set("Mongol_currentCollection", null);
    } else {
      Session.set("Mongol_currentCollection", "mongol_no_collections");
    }
  },
  'click .Mongol_contentView': function (e) {
    e.stopPropagation();
  }
});

Template.Mongol_collection_notFound.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "mongol_no_collections")) {
      return "Mongol_row_expand";
    }
  }
});

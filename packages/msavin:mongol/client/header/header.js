Template.Mongol_header.events({
  'click .Mongol_header': function () {
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {
      Session.set("Mongol_currentCollection", null);
    } else {
      Session.set("Mongol_currentCollection", "mongol_618");
    }
  },
  'click .Mongol_Minimize' : function (e) {
    e.stopPropagation();
    Session.set("Mongol_currentCollection", null);  
  },
  'click .Mongol_FullScreen' : function (e) {
    e.stopPropagation();
	MongolPackage.toggleFullScreen();
  }
});

Template.Mongol_header.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {
      return "Mongol_row_expand";
    }
  },
});

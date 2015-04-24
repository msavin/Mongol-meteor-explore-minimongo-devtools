Template.Mongol_Component.events({
	'click .Mongol_row': function () {
		if (Session.equals("Mongol_currentCollection", this.name)) {
		  Session.set("Mongol_currentCollection", null);
		} else {
		  Session.set("Mongol_currentCollection", this.name);
		}

		Session.set("Mongol_editMode", false);
	},
	'click .Mongol_contentView': function (e) {
		e.stopPropagation();
  	}
});

Template.Mongol_Component.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", this.name)) {
      return "Mongol_row_expand";
    }
  }
});

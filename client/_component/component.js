Template.Mongol_Component.events({
	'click .Mongol_row': function () {
		if (MeteorToysDict.equals("Mongol_currentCollection", this.name)) {
		  MeteorToysDict.set("Mongol_currentCollection", null);
		} else {
		  MeteorToysDict.set("Mongol_currentCollection", this.name);
		}

		MeteorToysDict.set("Mongol_editMode", false);
	},
	'click .Mongol_contentView': function (e) {
		e.stopPropagation();
  	}
});

Template.Mongol_Component.helpers({
  active: function () {
    if (MeteorToysDict.equals("Mongol_currentCollection", this.name)) {
      return "Mongol_row_expand";
    }
  }
});

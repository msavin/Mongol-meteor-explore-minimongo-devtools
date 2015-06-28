

Meteor.startup(function() {
  
  // Detect collections
  Mongol.detectCollections();

  // Hide Meteor Toys collections
  Mongol.hideCollection("MeteorToys_Impersonate");
  Mongol.hideCollection("MeteorToys_JetSetter");
  Mongol.hideCollection("MeteorToys_Mongol");

  // For use outside of Mongol package scope:
  // Package["msavin:mongol"].Mongol.hideCollection("mongoName");
  // Package["msavin:mongol"].Mongol.showCollection("localCollection");

  // Initialize Reactive-Dict
  MeteorToysDict = Package["meteortoys:toykit"].MeteorToysDict;

});


Template.Mongol.helpers({
  Mongol_collections: function () {
    // returns Mongo names of collections
    var    MongolConfig = MeteorToysDict.get("Mongol");
    return MongolConfig && _.without(MongolConfig.collections, null) || [];
  },
  active: function () {
    var MongolCollection = MeteorToysDict.get("Mongol_currentCollection");
    if (MongolCollection) {
      return "Mongol_expand";
    }
  }
});
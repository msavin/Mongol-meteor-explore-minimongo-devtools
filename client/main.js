Meteor.startup(function() {
  
  // Detect collections
    Mongol.detectCollections();

  // Initialize Reactive-Dict
    MeteorToysDict = Package["meteortoys:toykit"].MeteorToysDict;

  // Hide background collections
    Mongol.hideVelocity();
    Mongol.hideMeteorToys();

  // For use outside of Mongol package scope:
  // Package["msavin:mongol"].Mongol.hideCollection("mongoName");
  // Package["msavin:mongol"].Mongol.showCollection("localCollection");

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
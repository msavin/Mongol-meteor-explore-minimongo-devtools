Meteor.startup(function() {
  
  // Detect collections
  MongolPackage.detectCollections();

  // Hide Meteor Toys collections
  MongolPackage.hideCollection("MeteorToys_Impersonate");
  MongolPackage.hideCollection("MeteorToys_JetSetter");
  MongolPackage.hideCollection("MeteorToys_Mongol");

  // For use outside of Mongol package scope:
  // Package["msavin:mongol"].MongolPackage.hideCollection("mongoName");
  // Package["msavin:mongol"].MongolPackage.showCollection("localCollection");

});


Template.Mongol.helpers({
  Mongol_collections: function () {
    // returns Mongo names of collections
    var    MongolConfig = Session.get("Mongol");
    return MongolConfig && _.without(MongolConfig.collections, null) || [];
  },
  active: function () {
    var MongolCollection = Session.get("Mongol_currentCollection");
    if (MongolCollection) {
      return "Mongol_expand";
    }
  }
});
Meteor.startup(function() {
  
  // Detect collections
  MongolPackage.detectCollections();

});


Template.Mongol.helpers({
  Mongol_collections: function () {
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

Template.Mongol_collection.events({
  'click': function (evt) {

    var targetCollection = String(this),
        sessionKey       = "Mongol_" + targetCollection;

    if (Session.equals("Mongol_currentCollection", targetCollection)) {
      // do nothing
    } else {
      
      // If the collection doesn't have an index key set,
      // start it from the first document
      
      if (!Session.get(sessionKey)) {
        Session.set(sessionKey, 0);
      }

    }

  },
});

Template.Mongol_collection.helpers({
  collectionCount: function () {

    var collectionName = String(this);
    var collectionVar = Mongol.Collection(collectionName);

    var count = collectionVar && collectionVar.find().count() || 0;

    return count;

  },
  currentPosition: function () {

    var targetCollection = String(this);
    var sessionKey = "Mongol_" + targetCollection;

    var current = Session.get(sessionKey);
    var count = current + 1;

    return count;

  }
});

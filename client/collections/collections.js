Template.Mongol_collection.events({
  'click .Mongol_row': function (evt) {

    var targetCollection = String(this);
    var sessionKey = "Mongol_" + targetCollection;

    if (Session.equals("Mongol_currentCollection", targetCollection)) {

      // either do nothing or collapse the pane
      // comment out the line below for not collapsing the pane
      Session.set("Mongol_currentCollection", null);

    } else {

      Session.set("Mongol_editMode", false);

      // If the collection doesn't have an index key set,
      // start it from the first document
      if (!Session.get(sessionKey)) {
        Session.set(sessionKey, 0);
      }

      Session.set("Mongol_currentCollection", targetCollection);

    }

  },
  'click .Mongol_contentView': function(e, t) {
    e.stopPropagation();
  }
});

Template.Mongol_collection.helpers({
  active: function () {

    var currentCollection = Session.get("Mongol_currentCollection"),
      targetCollection = String(this);

    if (currentCollection === targetCollection) {
      return "Mongol_row_expand";
    }

  },
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

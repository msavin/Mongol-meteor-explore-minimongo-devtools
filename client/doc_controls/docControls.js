
// needs to be re-thought

// Strip out functions in case documents have had methods added to them

Mongol.validateDocument = function (doc) {
  var validatedDoc = {};
  _.each(doc, function (val, key) {
    if (_.isFunction(val)) {
      return;
    }
    validatedDoc[key] = val;
  });
  return validatedDoc;
}

Mongol.inlineEditingTimer = null;

Mongol.resetInlineEditingTimer = function() {
  if (Mongol.inlineEditingTimer) {
	Meteor.clearTimeout(Mongol.inlineEditingTimer);
  }
  MeteorToysDict.set('Mongol_noInlineEditing', true);
  Mongol.inlineEditingTimer = Meteor.setTimeout(function () {
    MeteorToysDict.set('Mongol_noInlineEditing', false);  
  },300);
}

Template.Mongol_docControls.events({
  'click .Mongol_m_new': function() {

    CollectionName    = MeteorToysDict.get("Mongol_currentCollection"),
    DocumentPosition  = MeteorToysDict.get("Mongol_" + String(this)),
    CurrentCollection = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),
    CollectionCount   = Mongol.Collection(CollectionName).find().count(),
    CurrentDocument   = CurrentCollection[DocumentPosition],
    DocumentID        = CurrentDocument._id,
    sessionKey        = "Mongol_" + String(this),
    ValidatedCurrentDocument = Mongol.validateDocument(CurrentDocument);

    Meteor.call("Mongol_duplicate", CollectionName, ValidatedCurrentDocument._id, function(error, result) {
      if (!error) {

        if (Mongol.Collection(CollectionName).findOne(result)) {

          // Get position of new document
          list  = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),
          docID = result,
          currentDoc;

          docIndex = _.map(list, function(obj, index) {
            if (obj._id === docID) {
              currentDoc = index;
            }
          })

          MeteorToysDict.set(sessionKey, Number(currentDoc));
        }

      } else {
        Mongol.error("duplicate");
      }
    });



  },
  'click .Mongol_m_edit': function() {
    MeteorToysDict.set("Mongol_editMode", true);
  },
  'click .Mongol_m_delete': function() {

    var CollectionName = MeteorToysDict.get("Mongol_currentCollection"),
      sessionKey = "Mongol_" + String(this);
    DocumentPosition = MeteorToysDict.get(sessionKey),
      CurrentCollection = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),
      CollectionCount = Mongol.Collection(CollectionName).find().count();

    var CurrentDocument = CurrentCollection[DocumentPosition],
      DocumentID = CurrentDocument._id;



    Meteor.call('Mongol_remove', CollectionName, DocumentID, function(error, result) {

      if (!error) {
        // Log the action
        console.log("Removed " + DocumentID + " from " + CollectionName + ". Back-up below:");
        console.log(CurrentDocument);

        // Adjust the position
        if (DocumentPosition >= CollectionCount - 1) {
          newPosition = DocumentPosition - 1;
          MeteorToysDict.set(sessionKey, newPosition);
        }

        if (MeteorToysDict.get(sessionKey) === -1) {
          MeteorToysDict.set(sessionKey, 0);
        }


      } else {
        Mongol.error("remove");
      }

    });



  },
  'click .Mongol_m_right': function(e,t) {
    // Verify that the button is not disabled
    if (!t.$('.Mongol_m_right').hasClass('Mongol_m_disabled')) {
      
      // Disable inline editing for 0.3s for quick flick to next doc
      Mongol.resetInlineEditingTimer();
	  
      // Grab the key

      var sessionKey = "Mongol_" + String(this);
      var CurrentDocument = MeteorToysDict.get(sessionKey);
      var collectionName = String(this);
      var collectionVar = Mongol.Collection(collectionName);
      var collectionCount = collectionVar.find().count() - 1;

      if (CurrentDocument > collectionCount) {
        MeteorToysDict.set(sessionKey, 0)
        return;
      }

      if (collectionCount === CurrentDocument) {
        // Go back to document 1 
        MeteorToysDict.set(sessionKey, 0);
      } else {
        // Go to next document
        var MongolDocNumber = MeteorToysDict.get(sessionKey) + 1;
        MeteorToysDict.set(sessionKey, MongolDocNumber);
      }
      
    }
  },
  'click .Mongol_m_left': function(e,t) {

    // Verify that the button is not disabled
    if (!t.$('.Mongol_m_left').hasClass('Mongol_m_disabled')) {

      // Disable inline editing for 0.3s for quick flick to next doc
      Mongol.resetInlineEditingTimer();
      
      // Grab the key
      sessionKey = "Mongol_" + String(this);
      // Get the document count
      var CurrentDocument = MeteorToysDict.get(sessionKey);
      var collectionName  = String(this);
      var collectionVar   = Mongol.Collection(collectionName);
      var collectionCount = collectionVar.find().count() - 1;

      if (CurrentDocument > collectionCount) {
        MeteorToysDict.set(sessionKey, collectionCount)
        return;
      }

      if (MeteorToysDict.get(sessionKey) === 0) {
        

        // Set the key to last
        MeteorToysDict.set(sessionKey, collectionCount)
      } else {
        var MongolDocNumber = MeteorToysDict.get(sessionKey) - 1;
        MeteorToysDict.set(sessionKey, MongolDocNumber);
      }

    }

  },
  'click .Mongol_edit_save': function() {

    // Get current document to get its current state
    // We need to send this to the server so we know which fields are up for change
    // when applying the diffing algorithm

    var collectionName = (MeteorToysDict.equals("Mongol_currentCollection", "account_618")) ? "users" : String(this);

    if (MeteorToysDict.equals("Mongol_currentCollection", "account_618")) {
      var newData = Mongol.getDocumentUpdate("account_618");
      var newObject = Mongol.parse(newData);
      var oldObject = Meteor.user();
      // console.log(targetCollection);
      // console.log(newData);
      // console.log(newObject);
    } else {
      var sessionKey = "Mongol_" + collectionName;
      DocumentPosition = MeteorToysDict.get(sessionKey),
        CurrentCollection = Mongol.Collection(collectionName).find({}, {transform: null}).fetch();
      var newData = Mongol.getDocumentUpdate(collectionName);
      var newObject = Mongol.parse(newData);
      var oldObject = CurrentCollection[DocumentPosition];
    }

    if (newObject) {
      Meteor.call("Mongol_update", collectionName, newObject, Mongol.validateDocument(oldObject), function(error, result) {
        if (!error) {
          MeteorToysDict.set('Mongol_editMode', null);

        } else {
          Mongol.error('update')
        }
      });
    }
  },
  'click .Mongol_edit_cancel': function() {
    MeteorToysDict.set('Mongol_editMode', null);
  },
  'click .Mongol_m_signout': function() {
    Meteor.logout();
  },
});


Template.Mongol_docControls.helpers({
  disable: function() {
    var sessionKey = "Mongol_" + String(this);
    var CurrentDocument = MeteorToysDict.get(sessionKey);
    var collectionName = String(this);
    var collectionVar = Mongol.Collection(collectionName);
    var collectionCount = collectionVar.find().count();
    
    if (CurrentDocument >= 1) {
      return;
    }

    if (collectionCount === 1) {
      return "Mongol_m_disabled";
    }

  },
  editing: function() {
    var editing = MeteorToysDict.get('Mongol_editMode');
    return editing;
  },
  editing_class: function() {
    var edit = MeteorToysDict.get('Mongol_editMode');
    if (edit) {
      return "Mongol_m_wrapper_expand"
    }
  },
  Mongol_docMenu_editing: function() {
    var editMode = MeteorToysDict.get("Mongol_editMode");

    if (editMode) {
      return "Mongol_docMenu_editing";
    }

  },
  active: function() {

    var current = MeteorToysDict.get("Mongol_currentCollection");

    // return true if collection name matches
    if (current === String(this)) {
      return true;
    }

    // return true if it's a user account
    if (current === "account_618") {
      return true;
    }

  },
  account: function() {

    var currentCollection = MeteorToysDict.get("Mongol_currentCollection");
    if (currentCollection === "account_618") {
      return true
    } else {
      return false
    }
  },

});

// Will possibly be used in augmented document udpate UI
/*Template.Mongol_docViewer.events({
'click .Mongol_string' : function (evt,tmpl) {
var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);
MeteorToysDict.set('Mongol_inlineEdit',true);
Tracker.flush();
// Do something to trigger the editable text element
}
});*/

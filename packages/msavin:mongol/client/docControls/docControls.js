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

Template.Mongol_docControls.events({
	'click .Mongol_m_new': function () {

		var CollectionName    = Session.get("Mongol_currentCollection"),
			DocumentPosition  = Session.get("Mongol_" + String(this)),
			CurrentCollection = Mongol.Collection(CollectionName).find().fetch(),
			CollectionCount   = Mongol.Collection(CollectionName).find().count();
			
		var	CurrentDocument   = CurrentCollection[DocumentPosition],
			DocumentID        = CurrentDocument._id,
			sessionKey        = "Mongol_" + String(this);

		var ValidatedCurrentDocument = Mongol.validateDocument(CurrentDocument);

		Meteor.call("Mongol_duplicate", CollectionName, ValidatedCurrentDocument, function (error, result) {
			if (!error) {
				
				if (Mongol.Collection(CollectionName).findOne(result)) {

					// Get position of new document
					var list  = Mongol.Collection(CollectionName).find().fetch();
					var docID = result;

					docIndex = $.map(list, function(obj, index) {
					    if(obj._id == docID) {
					        return index;
					    } 
					})

					Session.set(sessionKey, Number(docIndex));
				}
			
			} else {
				MongolPackage.error("duplicate");
			}
		});



	},
	'click .Mongol_m_edit': function () {
		Session.set("Mongol_editMode", true);
	},
	'click .Mongol_m_delete': function () {

		var CollectionName    = Session.get("Mongol_currentCollection"),
			sessionKey        = "Mongol_" + String(this);
			DocumentPosition  = Session.get(sessionKey),
			CurrentCollection = Mongol.Collection(CollectionName).find().fetch(),
			CollectionCount   = Mongol.Collection(CollectionName).find().count();
			
		var	CurrentDocument   = CurrentCollection[DocumentPosition],
			DocumentID        = CurrentDocument._id;

			

		Meteor.call('Mongol_remove', CollectionName, DocumentID, function (error, result) {
			
			if (!error) {
				// Log the action
				console.log("Removed " + DocumentID + " from " + CollectionName + ". Back-up below:"); 
				console.log(CurrentDocument);

				// Adjust the position
				if (DocumentPosition >= CollectionCount - 1) {
					newPosition = DocumentPosition - 1;
					Session.set(sessionKey, newPosition);
				}

				if (Session.get(sessionKey) === -1) {
					Session.set(sessionKey, 0);
				}


			} else {
				MongolPackage.error("remove");
			}

		});

		

	},
	'click .Mongol_m_right': function () {
		// Verify that the button is not disabled
		if (!$('.Mongol_m_right').hasClass('Mongol_m_disabled')) {
			
			// Grab the key
			sessionKey          = "Mongol_" + String(this);

			// Go forward one doc
			var MongolDocNumber = Session.get(sessionKey) + 1;
			Session.set(sessionKey, MongolDocNumber);
			// console.log("right" + this);
		}
	},
	'click .Mongol_m_left': function () {
		
		// Verify that the button is not disabled
		if (!$('.Mongol_m_left').hasClass('Mongol_m_disabled')) {

			// Grab the key
			sessionKey          = "Mongol_" + String(this);

			// Go back one doc
			var MongolDocNumber = Session.get(sessionKey) - 1;
			Session.set(sessionKey, MongolDocNumber);
			// console.log("left" + this);
		}

	},
	'click .Mongol_edit_save': function () {
		
		// Get current document to get its current state
		// We need to send this to the server so we know which fields are up for change
		// when applying the diffing algorithm
		
		var collectionName    = (Session.equals("Mongol_currentCollection","account_618")) ? "users" : String(this);
		
		if (Session.equals("Mongol_currentCollection","account_618")) {
			var newData   		 = MongolPackage.getDocumentUpdate("account_618");
			var newObject 		 = MongolPackage.parse(newData);
			var oldObject 		 = Meteor.user();
			// console.log(targetCollection);
			// console.log(newData);
			// console.log(newObject);
		} else {
			var sessionKey        = "Mongol_" + collectionName;
			DocumentPosition  = Session.get(sessionKey),
			CurrentCollection = Mongol.Collection(collectionName).find().fetch();
			var newData   		 = MongolPackage.getDocumentUpdate(collectionName);
			var newObject 		 = MongolPackage.parse(newData);
			var	oldObject	     = CurrentCollection[DocumentPosition];
		}

		if (newObject) {
			Meteor.call("Mongol_update", collectionName, newObject, Mongol.validateDocument(oldObject), function (error, result) {
				if (!error)	 {
					Session.set('Mongol_editMode',null);
					console.log('success')
				} else {
					MongolPackage.error('update')
				}
			});
		}
	},
	'click .Mongol_edit_cancel': function () {
		Session.set('Mongol_editMode',null);
	},
	'click .Mongol_m_signout': function () {
		Meteor.logout();
	},
});


Template.Mongol_docControls.helpers({
	disable_right: function () {
		var sessionKey      = "Mongol_" + String(this);
		var CurrentDocument = Session.get(sessionKey);
		var collectionName  = String(this);
		var collectionVar   = Mongol.Collection(collectionName);
			
		var	collectionCount = collectionVar.find().count() - 1;

		if (CurrentDocument === collectionCount) {
			return "Mongol_m_disabled";
		}

	},
	editing: function() {
		var editing = Session.get('Mongol_editMode');
		return editing;
	},
	editing_class: function() {
		var edit = Session.get('Mongol_editMode');
		if (edit) {
			return "Mongol_m_wrapper_expand"
		}
	},
	disable_left: function () {		
		var sessionKey        = "Mongol_" + String(this);
		var CurrentDocument = Session.get(sessionKey);
		
		if (CurrentDocument <= 0) {
			return "Mongol_m_disabled";
		}

	},
	Mongol_docMenu_editing: function () {
		var editMode = Session.get("Mongol_editMode");
		
		if (editMode) {
		    return "Mongol_docMenu_editing";
		}
		
	},
	active: function () {
		
		var current = Session.get("Mongol_currentCollection");
		
		// return true if collection name matches
		if (current === String(this)) {
			return true;
		}

		// return true if it's a user account
		if (current === "account_618") {
			return true;
		}
		
	},
	account: function () {

		var currentCollection = Session.get("Mongol_currentCollection");
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
Session.set('Mongol_inlineEdit',true);
Tracker.flush();
// Do something to trigger the editable text element
}
});*/

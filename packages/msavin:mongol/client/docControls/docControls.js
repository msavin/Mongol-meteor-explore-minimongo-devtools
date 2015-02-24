if (Meteor.isClient) {
	
Template.Mongol_docControls.events({
	'click .Mongol_m_new': function () {

		var CollectionName    = Session.get("Mongol_currentCollection"),
			DocumentPosition  = Session.get("Mongol_" + this),
			CurrentCollection = window[CollectionName].find().fetch(),
			CollectionCount   = window[CollectionName].find().count(),
			CurrentDocument   = CurrentCollection[DocumentPosition],
			DocumentID        = CurrentDocument._id,
			sessionKey        = "Mongol_" + this;


		Meteor.call("Mongol_duplicate", CollectionName, CurrentDocument, function (error, result) {
			if (!error) {
				
				if (window[CollectionName].findOne(result)) {

					// Get position of new document
					var list  = window[CollectionName].find().fetch();
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
			sessionKey        = "Mongol_" + this;
			DocumentPosition  = Session.get(sessionKey),
			CurrentCollection = window[CollectionName].find().fetch(),
			CollectionCount   = window[CollectionName].find().count(),
			CurrentDocument   = CurrentCollection[DocumentPosition],
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
			sessionKey        = "Mongol_" + this;

			// Go forward one doc
			var Mongol = Session.get(sessionKey) + 1;
			Session.set(sessionKey, Mongol)
			console.log("right" + this);
		}
	},
	'click .Mongol_m_left': function () {
		
		// Verify that the button is not disabled
		if (!$('.Mongol_m_left').hasClass('Mongol_m_disabled')) {

			// Grab the key
			sessionKey        = "Mongol_" + this;

			// Go back one doc
			var Mongol = Session.get(sessionKey) - 1;
			Session.set(sessionKey, Mongol)
			console.log("left" + this);
		}

	},
	'click .Mongol_edit_save': function () {
		
		if (Session.get("Mongol_currentCollection") === "account_618") {
			var targetCollection = "Meteor.users";
			var newData   		 = MongolPackage.getDocumentUpdate("account_618");
			var newObject 		 = MongolPackage.parse(newData);
			console.log(targetCollection);
			console.log(newData);
			console.log(newObject);
		} else {
			var targetCollection = String(this);
			var newData   		 = MongolPackage.getDocumentUpdate(this);
			var newObject 		 = MongolPackage.parse(newData)
		}

		if (newObject) {
			Meteor.call("Mongol_update", targetCollection, newObject, function (error, result) {
				if (!error)	 {
					Session.set('Mongol_editMode');
					console.log('success')
				} else {
					MongolPackage.error('update')
				}
			});
		}
	},
	'click .Mongol_edit_cancel': function () {
		Session.set('Mongol_editMode');
	},
	'click .Mongol_m_signout': function () {
		Meteor.logout();
	},
});


Template.Mongol_docControls.helpers({
	disable_right: function () {
		var sessionKey      = "Mongol_" + this,
			CurrentDocument = Session.get(sessionKey),
			collectionName  = this,
		    collectionVar   = window[collectionName],
			collectionCount = collectionVar.find().count() - 1;

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
		sessionKey        = "Mongol_" + this;
		CurrentDocument = Session.get(sessionKey);
		
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
		
		// return true if collectoin name matches
		if (current === String(this)) {
			return true;
		}

		// return true if its a user account
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

}
if (Meteor.isClient) {

	Template.Mongol_collection.events({
		'click': function () {

			var targetCollection =  String(this),
				sessionKey       = "Mongol_" + targetCollection;		

			if (targetCollection == Session.get("Mongol_currentCollection")) {
				// do nothing
			} else {
				
				Session.set("Mongol_editMode", false)

				var thisCollection = window[targetCollection],
					documentCount = thisCollection.find().count();

				// If the collection doesn't have an index key set,
				// start it from the first document
				if (!Session.get(sessionKey)) {
					Session.set(sessionKey, 0);
				}
			}

			Session.set("Mongol_currentCollection", targetCollection);
			
		}
	});

	Template.Mongol_collection.helpers({
		active: function () {
			var currentCollection = Session.get("Mongol_currentCollection"),
				targetCollection  = this;

			if (currentCollection == targetCollection) {
				return "Mongol_row_expand";
			} 
		},
	    collectionCount: function () {

	        var collectionName = this,
	            collectionVar  = window[collectionName],
	        	count          = collectionVar.find().count();

	        return count;

	    },
	    currentPosition: function () {
	        
	        var targetCollection = String(this);
	        var sessionKey       = "Mongol_" + targetCollection;
	        
	        var current = Session.get(sessionKey);
	        var count = current + 1;
	        
	        return count
	    }
	});

}
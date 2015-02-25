Meteor.startup(function() {
	// If the user hasn't done a Session.set('Mongol',{ ... });
	// set some default values

	if (typeof Session.get('Mongol') === 'undefined') {
	
		// Build a default config object
		
		var collections = _.map(Mongo.Collection.getAll(),function(collection) {
			
			// Note this returns the actual mongo collection name, not Meteor's Mongo.Collection name
			return collection.name;
			 
		});
		
		var defaults = {
			'collections':    collections, 
			'display':        false,
			'opacity_normal': ".7",
			'opacity_expand': ".9"
		}
	
		Session.set("Mongol", defaults);
	  
	}
  
});


// Give devs an api for hiding some collections, since they're all matched by default

Mongol.hideCollection = function(collectionName) {

	var MongolConfig = Session.get("Mongol") || {},
		collections  = MongolConfig.collections || {};
	
	collections = _.without(collections, collectionName);
	
	MongolConfig.collections = collections;
	
	Session.set("Mongol", MongolConfig);
	
}
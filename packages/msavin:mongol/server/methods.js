// It could be a good idea to replace the eval() function
// Also considering verifiying if Meteor is running locally
// Let me know what you think!

Meteor.methods({
	Mongol_verify: function() {
		
		// Check if the Meteor absolute URL
		// begins with http://localhost:

		var location = Meteor.absoluteUrl(),
			current  = location.substring(0, 17) 
			
		if (current = "http://localhost:") { 
			return "verified";
		} else {
			return false;
		}
	},
	Mongol_update: function(collectionName, documentData) {
		
		// var task = function () {
			// Convert Collection String to Variable
			var Mongol = eval(collectionName);

			// Get the document id
			var documentID    = documentData._id; 

			// Strip the ID from the document
			// to prepare it for update 
			delete documentData._id;

			// Run the magic
			Mongol.update(
				{
					_id: documentID
				}, 
					documentData
				);
		// }
		
		// Meteor.call("Mongol_verify", function (error, result) {
		// 	if (result === "verified") {
		// 		task();
		// 	} else {
		// 		return "absoluteURLError"
		// 	};
		// });

	},
	Mongol_remove: function(collectionName, documentID) {
		
		// var task = function () {

			// Convert Collection String to Variable
			var Mongol = eval(collectionName);

			// Remove the document
			Mongol.remove(documentID);

		// }

		// Meteor.call("Mongol_verify", function (error, result) {
		// 	if (result === "verified") {
		// 		task();
		// 	} else {
		// 		return "absoluteURLError"
		// 	};
		// });


	},
	Mongol_duplicate: function(collectionName, documentID) {
		// var task = function () {
			// Convert Collection String to Variable
			var Mongol = eval(collectionName);

			// Get the document id
			var OriginalDoc    = Mongol.findOne(documentID); 

			// Strip the ID from the document
			// to prepare it for update 
			delete OriginalDoc._id;

			// Run the magic
			var NewDocument = Mongol.insert(OriginalDoc);

			// Return the ID
			return NewDocument;
		// }

		// Meteor.call("Mongol_verify", function (error, result) {
		// 	if (result === "verified") {
		// 		task();
		// 	} else {
		// 		return "absoluteURLError";
		// 	};
		// });

	},
	Mongol_insert: function(collectionName, documentData) {
		
		// var task = function () {
			// Convert Collection String to Variable
			var Mongol = eval(collectionName); 

			// Run the magic
			Mongol.insert(documentData);
		// }

		// Meteor.call("Mongol_verify", function (error, result) {
		// 	if (result === "verified") {
		// 		task();
		// 	} else {
		// 		return "absoluteURLError";
		// 	};
		// });

	
	},
});


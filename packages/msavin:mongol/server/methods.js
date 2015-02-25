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
	Mongol_update: function(collectionName, documentData, originalDocumentData) {
		
		// var task = function () {
			// Convert Collection String to Variable
			var MongolCollection = Mongol.Collection(collectionName);

			// Get the document id
			var documentID    = documentData._id; 

			// Strip the ID from the document
			// to prepare it for update 
			delete documentData._id;
			delete originalDocumentData._id;
			
			var currentDbDoc = MongolCollection.findOne({_id: documentID});
			var updatedDocumentData = Mongol.diffDocumentData(currentDbDoc, documentData, originalDocumentData);

			// Run the magic
			MongolCollection.update(
				{
					_id: documentID
				}, 
					updatedDocumentData
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
			var MongolCollection = Mongol.Collection(collectionName);

			// Remove the document
			MongolCollection.remove(documentID);

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
			var MongolCollection = Mongol.Collection(collectionName);

			// Get the document id
			var OriginalDoc    = MongolCollection.findOne(documentID); 

			// Strip the ID from the document
			// to prepare it for update 
			delete OriginalDoc._id;

			// Run the magic
			var NewDocument = MongolCollection.insert(OriginalDoc);

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
			var MongolCollection = Mongol.Collection(collectionName);

			// Run the magic
			MongolCollection.insert(documentData);
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


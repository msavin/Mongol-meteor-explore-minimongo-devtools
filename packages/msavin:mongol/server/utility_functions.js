// This function takes three data points into account:

// 1) the actual document as it stands on the server, prior to being updated
// 2) the oldData that was on the client before the user pressed save
// 3) the newData that the client is trying to save

// This function decides which fields it is going to make writes to on this basis:
// 1) The field(s) being overwritten must appear in the db doc and on the client oldData 
//    (if they only appear in the oldData these must have been added dynamically on the client
//     and we don't want to save these fields to the db)
//    -- this includes fields that are being removed (i.e. they must appear in the db doc and the oldData)
// 2) Only fields that appear in the newData, but not the oldData or db doc can be added
//    (if it appears in the db doc, throw an error that says:
//     "There is an unpublished field in the database with that name. Update cannot be made.")

// The ramifications of all this:
// You can only update/remove fields that are published
// You can only add new fields if they don't exist in the db already


Mongol.diffDocumentData = function(dbDoc, newData, oldData) {
	
	// TODO -- recurse into subdocuments, performing checks
	// using the drillDown utility function (as seen in /common/common.js)

	var finalData = {};
	
	var dbDocFields    = _.keys(dbDoc),
	    newDataFields  = _.keys(newData), 
		oldDataFields  = _.keys(oldData); // console.log("dbDocFields",dbDocFields); console.log("newDataFields",newDataFields); console.log("oldDataFields",oldDataFields);
	
	// First get the set of fields that we won't be saving because they were dynamically added on the client
	
	var dynamicallyAddedFields = _.difference(oldDataFields, dbDocFields);
	
	// The get the fields that must retain their dbDoc field value, because they we'ren't published
	
	var unpublishedFields = _.difference(dbDocFields, oldDataFields); // console.log("unpublishedFields",unpublishedFields);
	
	// iterate over all fields, old and new, and ascertain the field value that must be added to the final data object
	
	var oldAndNewFields = _.union(dbDocFields, newDataFields);
	
	_.each(oldAndNewFields, function (field) {
		
		if (_.contains(dynamicallyAddedFields,field)) {
		  
		 	// We don't want to add this field to the actual mongodb document
			console.log("'" + field + "' appears to be a dynamically added field. This field was not updated.");
			return;
		  	
		}
		
		if (_.contains(unpublishedFields, field)) {
		
		    // We don't want to overwrite the existing mondodb document value
			if (newData[field]) {
				// Give a message to user as to why that field wasn't updated
				console.log("'" + field + "' is an unpublished field. This field's value was not overwritten.");
			}
			// Make sure the old value is retained
			finalData[field] = dbDoc[field];
			return;
			
		}
		
		finalData[field] = newData[field];
		
		// This will let unpublished fields into the database,
		// so the user may be confused by the lack of an update in the client
		// simply because the added field isn't published
		// The following solves that problem, but doesn't allow new fields to be published at all:
		//     finalData[field] = oldData[field] && newData[field];
		// We actually need to know the set of fields published by the publication that the client side doc came from
		// but how do we get that?
		
	});
	
	return finalData;

}

// Test code for Mongol.diffDocumentData

/*Meteor.startup(function() {
  
  // Take a user document
  var sampleDbDoc = { "_id" : "exampleuser1", "createdAt" : 1375253926213, "defaultPrograms" : { "514d75dc97d9562095578800" : "MYP", "515be9e6a57068c708000000" : "PYP" }, "department_id" : [  "GMsv9YzaCuL6dFBYL" ], "emails" : [  {  "address" : "babrahams@wab.edu",  "verified" : true } ], "myCourses" : [  "QqofG3XyEtQPgFb72",  "fvTxhAyfMxFbhzwK7",  "jcPtgwN2t6pTMQDEp" ], "organization_id" : [  "51f76bcb45623dfb1e0d3100" ], "permContexts" : [ 	{ 	"department_id" : "GMsv9YzaCuL6dFBYL", "perms" : [ 	"editRoles", 	"editCourses", 	"editUnits", 	"editAssessments", 	"editDepartments" ] } ], "roleContexts" : [ 	{ 	"organization_id" : "51f76bcb45623dfb1e0d3100", 	"school_id" : "514d75dc97d9562095578800", 	"department_id" : "GMsv9YzaCuL6dFBYL", 	"roles" : [ 	"iQD4BhnB8PFWwHCcg" ] }, 	{ 	"organization_id" : "2BjJbMyRLWa4iofQm" } ], "school_id" : [  "514d75dc97d9562095578800" ], "services" : { "password" : { "bcrypt" : "$2a$10$M55xiZA6rX0EwZ6xBk3Rre6/J5s3XUunre5.5ijyU3.ilpYZQFmtO" }, "resume" : { "loginTokens" : [ 	{ 	"when" : "2014-12-24T12:00:06.725Z", 	"hashedToken" : "not/telling=" }, 	{ 	"when" : "2015-01-16T04:45:10.574Z", 	"hashedToken" : "bigbadhashedtoken=" }, 	{ 	"when" : "2015-01-22T02:01:57.671Z", 	"hashedToken" : "9HSCRUygOiPYgmUsmWA5jcYutqKnjT9OByHPA6LbBB8=" } ] } }, "superuser" : [  "51f76bcb45623dfb1e0d3100",  "2BjJbMyRLWa4iofQm",  "ZkeRkDEEcp72bAFQY" ], "transaction_id" : "shQ9fzcZYSgLLnptC" };
  
  // Simulate the oldData getting sent back from the client (the fields should be a subset of the db fields)
  var sampleOldData = _.extend(_.clone(sampleDbDoc),{dynamicallyAddedField:true, secondDynamicallyAddedField: "Dynamically added value"}); // Simulate two dynamically added fields
  delete sampleOldData.services; // Simulate an unpublished field
  
  // Simulate the newData getting sent back from the client
  // e.g. user adds a new field
  var sampleNewData = _.extend(_.clone(sampleOldData),{brandNewField: true});
  // brandNewField should be added
  delete sampleNewData.createdAt; // This should be gone
  sampleNewData.secondDynamicallyAddedField = "Dynamically added value overwritten by user"; // seconddynamicallyAddedField should be gone
  sampleNewData.transaction_id = "overwritten transaction id"; // This field should be changed
  
  // Run the test
  
  console.log(Mongol.diffDocumentData(sampleDbDoc, sampleNewData, sampleOldData));
  
});*/
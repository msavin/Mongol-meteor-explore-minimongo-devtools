Meteor.methods({
  Mongol_verify: function () {

    // NOTE: This function is not in use

    // Check if the Meteor absolute URL
    // begins with http://localhost:

    var location = Meteor.absoluteUrl(),
      current = location.substring(0, 17);

    if (current === "http://localhost:") {
      return "verified";
    }
    return false;

    // Currently not in use, but under consideration
    // To Use:

    // Meteor.call("Mongol_verify", function (error, result) {
    // 	if (result === "verified") {
    // 		task();
    // 	} else {
    // 		return "absoluteURLError"
    // 	};
    // });

  },
  Mongol_update: function (collectionName, documentData, originalDocumentData) {

    check(collectionName, String);
    check(documentData, Object);
    check(originalDocumentData, Object);

    var MongolCollection = Mongol.Collection(collectionName),
      documentID = documentData._id;

    var currentDbDoc = MongolCollection.findOne({
      _id: documentID
    });

    if (!currentDbDoc) {
	  // A document with this _id value is not in the db
	  // Do an insert instead
	  Meteor.call("Mongol_insert", collectionName, documentData);
	  return;
	}

    delete documentData._id;
    delete originalDocumentData._id;

    var updatedDocumentData = Mongol.diffDocumentData(currentDbDoc, documentData, originalDocumentData);
	
    if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema)) {
      
      // This is to nullify the effects of SimpleSchema/Collection2
      // Using `upsert` means that a user can change the _id value in the JSON
      // and then press the 'Update' button to create a duplicate (published keys/values only) with a different _id
	  
	  MongolCollection.update({
        _id: documentID
      }, updatedDocumentData, {
        filter: false,
        autoConvert: false,
        removeEmptyStrings: false,
        validate: false
      });
      return;
    }

    // Run the magic
    MongolCollection.update({
        _id: documentID
      },
      updatedDocumentData
    );

  },
  Mongol_remove: function (collectionName, documentID) {

    check(collectionName, String);
    check(documentID, String);

    var MongolCollection = Mongol.Collection(collectionName);

    MongolCollection.remove(documentID);

  },
  Mongol_duplicate: function (collectionName, documentID) {

    check(collectionName, String);
    check(documentID, String);

    var MongolCollection = Mongol.Collection(collectionName),
      OriginalDoc = MongolCollection.findOne(documentID);

    delete OriginalDoc._id;

    var NewDocument = MongolCollection.insert(OriginalDoc);

    return NewDocument;

  },
  Mongol_insert: function(collectionName, documentData) {

    check(collectionName, String);
    check(documentData, Object);

    var MongolCollection = Mongol.Collection(collectionName),
	    newId = null;
		
	if (documentData._id && MongolCollection.findOne({_id: documentData._id})) {
	  console.log('Duplicate _id found');
	  return null;	
	}

    if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema)) {
      // This is to nullify the effects of SimpleSchema/Collection2
      newId = MongolCollection.insert(documentData, {
        filter: false,
        autoConvert: false,
        removeEmptyStrings: false,
        validate: false
      });
    }
	else {
      newId = MongolCollection.insert(documentData);
	}
	
	return newId;

  },
});

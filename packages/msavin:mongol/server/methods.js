Meteor.methods({
  Mongol_verify: function () {

    // Check if the Meteor absolute URL
    // begins with http://localhost:

    var location = Meteor.absoluteUrl(),
      current = location.substring(0, 17);

    if (current = "http://localhost:") {
      return "verified";
    }
    return false;

    // Current not in use, but under consideratoin
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

    var MongolCollection = Mongol.Collection(collectionName),
      documentID = documentData._id;

    delete documentData._id;
    delete originalDocumentData._id;

    var currentDbDoc = MongolCollection.findOne({
        _id: documentID
      }),
      updatedDocumentData = Mongol.diffDocumentData(currentDbDoc, documentData, originalDocumentData);


    if (!!Package['aldeed:simple-schema'] && _.isFunction(MongolCollection.simpleSchema)) {
      // This is to nullify the effects of SimpleSchema/Collection2
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

    var MongolCollection = Mongol.Collection(collectionName);

    MongolCollection.remove(documentID);

  },
  Mongol_duplicate: function (collectionName, documentID) {

    var MongolCollection = Mongol.Collection(collectionName),
      OriginalDoc = MongolCollection.findOne(documentID);

    delete OriginalDoc._id;

    var NewDocument = MongolCollection.insert(OriginalDoc);

    return NewDocument;

  },
  Mongol_insert: function(collectionName, documentData) {

    var MongolCollection = Mongol.Collection(collectionName);

    if (!!Package['aldeed:simple-schema'] && _.isFunction(MongolCollection.simpleSchema)) {
      // This is to nullify the effects of SimpleSchema/Collection2
      MongolCollection.insert(documentData, {
        filter: false,
        autoConvert: false,
        removeEmptyStrings: false,
        validate: false
      });
      return;
    }

    MongolCollection.insert(documentData);

  },
});

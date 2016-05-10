Meteor.methods({
  Mongol_update: function (collectionName, documentData, originalDocumentData) {

    check(collectionName, String);
    check(documentData, Object);
    check(originalDocumentData, Object);

    var MongolCollection = Mongol.Collection(collectionName),
        documentID       = documentData._id,
        originalID       = originalDocumentData._id;

    var currentDbDoc = MongolCollection.findOne({
      _id: documentID
    }, {
      transform: null
    });

    if (!currentDbDoc) {
      // A document with this _id value is not in the db
      // Do an insert instead
      Meteor.call("Mongol_insert", collectionName, documentData);
      return;
    }

    delete documentData._id;
    delete originalDocumentData._id;
    delete currentDbDoc._id;

    var updatedDocumentData = Mongol.diffDocumentData(currentDbDoc, documentData, originalDocumentData);
    

    // Check for packages

    if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema) && MongolCollection._c2) {
      
      // This is to nullify the effects of SimpleSchema/Collection2
      // Using `upsert` means that a user can change the _id value in the JSON
      // and then press the 'Update' button to create a duplicate (published keys/values only) with a different _id
      
      MongolCollection.update({
        _id: documentID
      }, {$set: updatedDocumentData}, {
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
  Mongol_remove: function (collectionName, documentID, doNotTrash) {

    check(collectionName, String);
    check(documentID, String);
    check(doNotTrash, Match.Any);


    var MongolCollection = Mongol.Collection(collectionName);
    var docToBeRemoved   = MongolCollection.findOne(documentID, {transform: null});
    

    // Start Trash Can
    if(typeof doNotTrash === 'undefined') {

        targetCollection        = Mongol.Collection("MeteorToys.Mongol");
        trashDocument           = docToBeRemoved;
        trashDocument["Mongol_origin"] = String(collectionName);
        trashDocument["Mongol_date"]   = new Date();
        targetCollection.insert(trashDocument);

    }
    // End Trash Can

    // remove the document
    MongolCollection.remove(documentID);
    
    return docToBeRemoved;

  },
  Mongol_duplicate: function (collectionName, documentID) {

    check(collectionName, String);
    check(documentID, String);

    var MongolCollection = Mongol.Collection(collectionName),
        OriginalDoc      = MongolCollection.findOne(documentID, {transform: null});

    if (OriginalDoc) {

      delete OriginalDoc._id;

      // Convert date strings to Date()
      var revisedDocument = OriginalDoc;

      var NewDocumentId = Mongol.insertDoc(MongolCollection, revisedDocument);

      return NewDocumentId;
      
    }

  },
  Mongol_insert: function(collectionName, documentData) {

    check(collectionName, String);
    check(documentData, Object);

    var MongolCollection = Mongol.Collection(collectionName),
        newId = null;
        
    if (documentData._id && MongolCollection.findOne({_id: documentData._id}, {transform: null})) {
      console.log('Duplicate _id found');
      return null;    
    }

    revisedDocument = documentData; 


    // Insert it 
        
    var newId = Mongol.insertDoc(MongolCollection, revisedDocument);
    
    return newId;

  }
});
// // // // // // // // // // // // // // // // // // // // // // 
// 
// TODO:
// - For update, diff document changes and use $set for changes
//   to control date fields from database level
// - For duplicate, use actual MongoDB duplicate function
// 
// Pull request welcome here!
// 
// // // // // // // // // // // // // // // // // // // // // // 

var dateParser = function (updatedDocumentData) {

  // Purpose: Convert date strings to Date()
  // This is hacky but works in most cases 
  // Won't merge into Mongol namespace until its good

  currentDocument = updatedDocumentData;
  revisedDocument = currentDocument;

  // Loop over object
  // Replace date strings with dates 
  for (var key in currentDocument) {
    if (currentDocument.hasOwnProperty(key)) {

      var t_self = currentDocument[key],
          t_date;

      
      if (t_self) {
        // check its a string to avoid hooking t/f values
        if (typeof t_self === 'string') {
        // ensure its not just a number 
        // need a stronger test here
          if (/\s/g.test(t_self)) {
            // attempt to convert to date
            t_date = new Date(t_self);
          }
        }
      }
      
      if (Object.prototype.toString.call(t_date) === '[object Date]') {
        if ( isNaN( t_date.getTime() ) ) {  
           // do nothing
         }
         else {
           revisedDocument[key] = t_date;
         }
      }

    }
  }

  // return the processed document
  return revisedDocument;

}

var insertDoc = function (MongolCollection, documentData) {

  check(MongolCollection, Match.Any);
  check(documentData, Match.Any);

  if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema) && MongolCollection._c2) {
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
}

Meteor.methods({
  Mongol_update: function (collectionName, documentData, originalDocumentData) {

    check(collectionName, String);
    check(documentData, Object);
    check(originalDocumentData, Object);

    var MongolCollection = Mongol.Collection(collectionName),
      documentID = documentData._id;

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

    var updatedDocumentData = Mongol.diffDocumentData(currentDbDoc, documentData, originalDocumentData),
        revisedDocument     = dateParser(updatedDocumentData);
    

    // Check for packages

    if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema) && MongolCollection._c2) {
      
      // This is to nullify the effects of SimpleSchema/Collection2
      // Using `upsert` means that a user can change the _id value in the JSON
      // and then press the 'Update' button to create a duplicate (published keys/values only) with a different _id
      
      MongolCollection.update({
        _id: documentID
      }, {$set: revisedDocument}, {
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
      revisedDocument
    );

  },
  Mongol_remove: function (collectionName, documentID, doNotTrash) {

    check(collectionName, String);
    check(documentID, String);
    check(doNotTrash, Match.Any);


    var MongolCollection = Mongol.Collection(collectionName);
    var docToBeRemoved = MongolCollection.findOne(documentID, {transform: null});
    MongolCollection.remove(documentID);

    // Start Trash Can
    if(typeof doNotTrash === 'undefined') {
      if (Package["meteortoys:toypro"]) {
        targetCollection        = Mongol.Collection("MeteorToys_Mongol");
        trashDocument           = docToBeRemoved;
        trashDocument["Mongol_origin"] = String(collectionName);
        trashDocument["Mongol_date"]   = new Date();
        targetCollection.insert(trashDocument);
      }
    }
    // End Trash Can
    
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
      var revisedDocument = dateParser(OriginalDoc);;

      var NewDocumentId = insertDoc(MongolCollection, revisedDocument);

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

    revisedDocument = dateParser(documentData); 


    // Insert it 
        
    var newId = insertDoc(MongolCollection, revisedDocument);
    
    return newId;

  },
});
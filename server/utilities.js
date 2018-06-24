Mongol = {};

Mongol.Collection = function (collectionName) {

  // Go through a variety of means of trying to return the correct collection
  return Mongo.Collection.get(collectionName)
    // This should automatically match all collections by default
    // including namespaced collections

  || ((Meteor.isServer) ? eval(collectionName) : Meteor._get.apply(null,[window].concat(collectionName.split('.'))))
  // For user defined collection names
  // in the form of Meteor's Mongo.Collection names as strings

  || ((Meteor.isServer) ? eval(firstToUpper(collectionName)) : Meteor._get.apply(null,[window].concat(firstToUpper(collectionName).split('.'))))
  // For user defined collections where the user has typical upper-case collection names
  // but they've put actual mongodb collection names into the Mongol config instead of Meteor's Mongo.Collection names as strings

  || null;
  // If the user has gone for unconventional casing of collection names,
  // they'll have to get them right (i.e. Meteor's Mongo.Collection names as string) in the Mongol config manually

  // Changes the first character of a string to upper case

  function firstToUpper(text) {

    return text.charAt(0).toUpperCase() + text.substr(1);

  }
}

Mongol.insertDoc = function (MongolCollection, documentData) {

  check(MongolCollection, Match.Any);
  check(documentData, Match.Any);

  if (!!Package['aldeed:collection2'] && _.isFunction(MongolCollection.simpleSchema) && MongolCollection._c2) {
    // This is to nullify the effects of SimpleSchema/Collection2
    newId = MongolCollection.insert(documentData, {
      bypassCollection2: true
    });
  }
  else {
    newId = MongolCollection.insert(documentData);
  }
  return newId;
}

// This function takes three data points into account:

// 1) the actual document as it stands on the server, prior to being updated
// 2) the oldData that was on the client before the user pressed save
// 3) the newData that the client is trying to save

// This function decides which fields it is going to make writes to on this basis:
// 1) The field(s) being overwritten must appear in the db doc and on the client oldData
//(if they only appear in the oldData these must have been added dynamically on the client
// and we don't want to save these fields to the db)
//-- this includes fields that are being removed (i.e. they must appear in the db doc and the oldData)
// 2) Only fields that appear in the newData, but not the oldData or db doc can be added
//(if it appears in the db doc, throw an error that says:
// "There is an unpublished field in the database with that name. Update cannot be made.")

// The ramifications of all this:
// You can only update/remove fields that are published
// You can only add new fields if they don't exist in the db already


Mongol.diffDocumentData = function (dbDoc, newData, oldData) {

  var finalData = {};

  var dbDocFields = _.keys(dbDoc);
  var newDataFields = _.keys(newData);
  var oldDataFields = _.keys(oldData); // console.log("dbDocFields",dbDocFields); console.log("newDataFields",newDataFields); console.log("oldDataFields",oldDataFields);

  // First get the set of fields that we won't be saving because they were dynamically added on the client

  var dynamicallyAddedFields = _.difference(oldDataFields, dbDocFields);

  // Then get the fields that must retain their dbDoc field value, because they we'ren't published

  var unpublishedFields = _.difference(dbDocFields, oldDataFields); // console.log("unpublishedFields",unpublishedFields);

  // iterate over all fields, old and new, and ascertain the field value that must be added to the final data object

  var oldAndNewFields = _.union(dbDocFields, newDataFields);

  _.each(oldAndNewFields, function(field) {

    if (_.contains(dynamicallyAddedFields, field)) {
  
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

    if (!_.isUndefined(newData[field])) {
        
      finalData[field] = (_.isObject(newData[field]) && !_.isArray(newData[field]) && !_.isDate(newData[field])) ? Mongol.diffDocumentData(dbDoc[field] || {}, newData[field], oldData[field] || {}) : newData[field];
      
    }

  });

  return finalData;

};

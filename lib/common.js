if (Mongol === undefined) {
  
  // Create object and reserve name across the package
  Mongol = {};

}

// Go through a variety of means of trying to return the correct collection

Mongol.Collection = function (collectionName) {

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
  
};

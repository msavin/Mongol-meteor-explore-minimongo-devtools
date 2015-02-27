if (Mongol === undefined) {

  // Reserve this variable name across the package
  // In case we'd like to export it to give package users a simple api
  // e.g. when all collections have been matched by default, but the developer wants to suppress some
  // Mongol.hideCollection('posts');
  // Downside is that it pollutes the global namespace with `Mongol`, but most apps can probably live with that
  // See /client/defaults/defaults.js for implementation

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


  // Changes the first character of a string to upper case

  function firstToUpper(text) {

    return text.charAt(0).toUpperCase() + text.substr(1);

  }
  
};

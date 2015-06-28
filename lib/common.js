MeteorToysDict = Package["meteortoys:toykit"].MeteorToysDict;

if (Mongol === undefined) {
  
  // Create object and reserve name across the package
  Mongol = {};

}

Mongol = {
  'colorize': function (json) {
    // colorized the JSON objects
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'Mongol_number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'Mongol_key';
        } else {
          cls = 'Mongol_string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'Mongol_boolean';
      } else if (/null/.test(match)) {
        cls = 'Mongol_null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  },
  'getDocumentUpdate': function (data) {

    var elementID = 'MongolDoc_' + data,
      newData = document.getElementById(elementID).textContent;

    return newData;

  },
  'error': function (data) {

    switch (data) {
      case "json.parse":
        alert("There is an error with your JSON syntax.\n\nNote: keys and string values need double quotes.");
        break;
      case "duplicate":
        alert("Strange, there was an error duplicating your document.");
        break;
      case "remove":
        alert("Strange, there was an error removing your document.");
        break;
      case "insert":
        alert("Strange, there was an error inserting your document.");
        break;
      case "update":
        alert("There was an error updating your document. Please review your changes and try again.");
        break;
      default:
        return "Unknown Error";
        break;
    }

  },
  'parse': function (data) {
    var newObject = false;

    try {
      newObject = JSON.parse(data);
    }

    catch (error) {
      Mongol.error("json.parse");
    }

    return newObject;

  },
  'setSubscriptionKeys': function () {

      // var subscriptions  = Meteor.default_connection._subscriptions,
          // subKeys        = Object.keys(subscriptions);

          // MeteorToysDict.set("MeteorToys_PubSub", subKeys)

  },
  'detectCollections': function () {
    if (MeteorToysDict.get('Mongol') === undefined) {
        // Note: this returns the actual mongo collection name
        var collections = _.map(Mongo.Collection.getAll(), function (collection) {
        return collection.name;
      });

      var defaults = {
        'collections': collections,
      };

      MeteorToysDict.set("Mongol", defaults);

    }
  },
  'hideCollection': function (collectionName) {

    var MongolConfig = MeteorToysDict.get("Mongol") || {},
        collections  = MongolConfig.collections || {};

    collections = _.without(collections, collectionName);
    MongolConfig.collections = collections;
    MeteorToysDict.set("Mongol", MongolConfig);
    
  },
  'showCollection': function (collectionName) {

    // In case a collection does not get detected, like a local one
    var MongolConfig = MeteorToysDict.get("Mongol") || {},
        collections  = MongolConfig.collections || {};

    collections.push(collectionName);
    
    MeteorToysDict.set("Mongol", MongolConfig);

  },
  'Collection': function (collectionName) {


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
    
  }
}
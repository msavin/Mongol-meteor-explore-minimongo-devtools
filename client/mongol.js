Template.Mongol.helpers({
  Mongol_collections: function () {
    var MongolConfig = Session.get("Mongol");
    return MongolConfig && _.without(MongolConfig.collections, null) || [];
  },
  active: function () {
    var MongolCollection = Session.get("Mongol_currentCollection");
    if (MongolCollection) {
      return ((Session.get("Mongol_fullscreen")) ? "Mongol_fullscreen " : "") + "Mongol_expand";
    }
  }
});


// Namespaced Functions

MongolPackage = {
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
      case "permission":
        // under consideration
        alert("This Meteor applications looks to be deployed in debug mode. Mongol cannot edit this document because it onlys works if the absolute URL beings with 'http://localhost:'")
      default:
        return "Request Credentials";
        break;
    }

  },
  'parse': function (data) {
    var newObject = false;

    try {
      newObject = JSON.parse(data);
    } catch (error) {
      MongolPackage.error("json.parse");
    }

    return newObject;

  }
};


// default.js

Meteor.startup(function() {
  
  // If the user hasn't done a Session.set('Mongol',{ ... });
  // set some default values
  if (Session.get('Mongol') === undefined) {

  // Build a default config object
  // Build a default config object

    var collections = _.map(Mongo.Collection.getAll(), function (collection) {

      // Note this returns the actual mongo collection name, not Meteor's Mongo.Collection name
      return collection.name;

    });

    var defaults = {
      'collections': collections,
    };

    Session.set("Mongol", defaults);

  }
});


// Give devs an api for hiding some collections, since they're all matched by default

Mongol.hideCollection = function (collectionName) {

  var MongolConfig = Session.get("Mongol") || {},
    collections = MongolConfig.collections || {};

  collections = _.without(collections, collectionName);

  MongolConfig.collections = collections;

  Session.set("Mongol", MongolConfig);

};
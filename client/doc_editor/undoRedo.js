// Undo Redo for Mongol

Template.Mongol_undoRedo.helpers({
  stack: function (type) {
    var key = UndoRedo.makeKey(String(this), (type === 'redo') ? 'undone' : 'done');
    var stack = Session.getJSON(key);
    var latest = _.isArray(stack) && stack.length && stack[stack.length - 1]; // console.log("latest " + key + ":",latest);
    return (latest) ? {latest: latest, count: stack.length} : null; 
  }
});

Template.Mongol_undoRedo.events({
  'click .redo-button, click .undo-button' : function (evt, tmpl) {
    evt.stopPropagation();
    var type = ($(evt.currentTarget).hasClass('redo-button')) ? 'redo' : 'undo';
    if (type === 'redo') {
      var redo = true;
      UndoRedo.undo(String(tmpl.data), redo);
    }
    else {
      UndoRedo.undo(String(tmpl.data));
    }
  }
});

if (!!EditableJSON) {
  EditableJSON.afterUpdate = function(collection, action, result) {
    /*console.log("doc before:",this);
    console.log("collection:",collection);
    console.log("action:",action);
    console.log("result:", result);
    console.log("doc after:", Mongo.Collection.get(collection).findOne({_id:this._id}));*/
    var updatedDocument = Mongo.Collection.get(collection).findOne({_id:this._id});
    UndoRedo.add(collection, {
      action: 'update',
      document: this,
      updatedDocument: updatedDocument
    });
  }
}

UndoRedo = {};

UndoRedo.makeKey = function (collection, stack) {
  return 'Mongol_undoRedo.' + stack; // 'Mongol_undoRedo.' + collection + '.' + stack;
}

// Add an action to the "done" stack for a given collection

// data is an object of the form:
//   { action: "update", document: <DOCUMENT BEFORE UPDATE> }
//   { action: "insert", document: <DOCUMENT INSERTED> }
//   { action: "remove", document: <DOCUMENT BEFORE REMOVE> }

UndoRedo.add = function (collection, data) {
  data.timestamp = Date.now();
  data.collection = collection;
  data.id = Random.id();
  var doneStackKey = UndoRedo.makeKey(collection, 'done');
  var undoneStackKey = UndoRedo.makeKey(collection, 'undone');
  var doneStack = _.clone(Session.getJSON(doneStackKey));
  if (!_.isArray(doneStack)) {
    doneStack = [];
  }
  doneStack.push(data);
  Session.setJSON(doneStackKey, doneStack);
  // Clear the undone stack on every new action
  // Session.setJSON(undoneStackKey, []);
}

UndoRedo.undo = function (action, redo) {
  // var Collection = Mongo.Collection.get(collection);
  var collection = action.collection;
  var doneStackKey = UndoRedo.makeKey(collection, 'done');
  var undoneStackKey = UndoRedo.makeKey(collection, 'undone');
  var doneStack = Session.getJSON(doneStackKey) || [];
  var undoneStack = Session.getJSON(undoneStackKey) || [];
  // console.log("collection:",collection);console.log("doneStackKey:",doneStackKey);console.log("undoneStackKey:",undoneStackKey);console.log("doneStack:",doneStack);console.log("undoneStack:",undoneStack);
  var setStacks = function () {
    Session.setJSON(doneStackKey, doneStack);
    Session.setJSON(undoneStackKey, undoneStack);
  }
  // Get the latest thing on the done stack
  var currentStack = (redo) ? undoneStack : doneStack;
  var latestAction = action; // _.isArray(currentStack) && currentStack.length && currentStack.pop();
  /*if (!latestAction) {
    // Fix stack up and try again if there is another action available
    setStacks();
    if (currentStack.length) {
      UndoRedo.undo(collection, redo);
    }
    return;
  }*/
  var pullFromStack = function (stack, act) {
    var index = -1;
    var found = false;
    _.find(stack, function (a,i) {
      index = i;
      if (a.id === latestAction.id) {
        found = true;  
      }
      return a.id === latestAction.id;
    });
    /*console.log("latestAction:",latestAction);
    console.log("index:",index);
    console.log("Before:", _.clone(stack));*/
    if (found) {
      stack.splice(index, 1);
    }
    //console.log("After:",_.clone(stack));
    return found;
  };
  if (!pullFromStack(currentStack, action)) {
    // This should never happen
    return;  
  }
  var targetStack = (redo) ? doneStack : undoneStack;
  if (!_.isArray(targetStack)) {
    targetStack = [];  
  }
  targetStack.push(latestAction);
  if (redo) {
    doneStack = targetStack;
    undoneStack = currentStack;
  }
  else {
    doneStack = currentStack;
    undoneStack = targetStack;
  }
  var doc = latestAction.document;
  // Now really undo the latest action
  switch(latestAction.action) {
    case 'insert' :
      var call = (redo) ? 'Mongol_insert' : 'Mongol_remove';
      var param = (redo) ? doc : doc._id;
      Meteor.call(call, collection, param, function (err, res) {
        UndoRedo.setDocumentNumber(collection, res || null);
        setStacks();
      });
      break;
    case 'update' :
      var currentDoc = Mongo.Collection.get(collection).findOne({_id: doc._id}); // Collection
      /*console.log("redo:",redo);
      console.log("collection:",collection);
      console.log("latestAction:",latestAction);
      console.log("doc:",doc);
      console.log("currentDoc:",currentDoc);*/
      var cancel = false;
      if (!currentDoc) {
        // This document no longer exists, we need to remove the action from the stack
        cancel = true;
        alert('This document is not available for updates anymore');
        return;
      }
      else {
        // Document still exists - proceed as normal
        var docVersion = (redo) ? latestAction.updatedDocument : doc;
        var comparisonVersion = (redo) ? doc : latestAction.updatedDocument;
        var diffedVersionData = Mongol.diffUpdateData(currentDoc, docVersion, comparisonVersion);
        if (diffedVersionData.cancel) {
          alert('This document has undergone subsequent changes that conflict with this update.');
          // cancel = true;
          return;
        }
        else {
          // We're still good to make the update - this is the data we're going to return
          var diffedVersion = diffedVersionData.diffedDocument; 
        }
      }
      /*if (cancel) {
        if (redo) {
          pullFromStack(doneStack, action);
        }
        else {
          pullFromStack(undoneStack, action);
        }
        setStacks();
        return;
      }*/
      Meteor.call('Mongol_update', collection, diffedVersion, currentDoc, function (err, res) {
        UndoRedo.setDocumentNumber(collection, doc._id);
        setStacks(); 
      });
      break;
    case 'remove' :
      var call = (redo) ? 'Mongol_remove' : 'Mongol_insert';
      var param = (redo) ? doc._id : doc;
      Meteor.call(call, collection, param, function (err, res) { // res is the _id of the inserted document
        UndoRedo.setDocumentNumber(collection, res || null);
        setStacks(); 
      });
      break;
  }
}

UndoRedo.redo = function (collection) {
  var redo = true;
  UndoRedo.undo(collection, redo);
}

// Sets the appropriate session variable to the correct document number

UndoRedo.setDocumentNumber = function (collection, _id) {
  var sessionKey = "Mongol_" + collection;
  if (_id) {
    var Collection = Mongo.Collection.get(collection);
    var documents = Collection.find().fetch();
    var docNumber = 0;
    _.find(documents, function (doc, index) {
      if (doc._id === _id) {
        docNumber = index;    
      }
    });
  }
  else {
    // Just decrement the docNumber
    var docNumber = Session.get(sessionKey);
    if (docNumber) {
      docNumber--;
    }
    else {
      docNumber = 0;    
    }
  }
  Session.set(sessionKey, docNumber);
  if (!Session.equals("Mongol_currentCollection", "actions_618")) {
    Session.set("Mongol_currentCollection", collection);
  }
}

// Diffing function
// This function takes three data points into account:

// 1) the dbDoc as it currently published (the canonical real-time version) -- note: unpublished fields will be missing
// 2) the oldData that was on the client before the update (latest historical version)
// 3) the newData that was on the client after the update (previous historical version)

// This function overwrites fields in the canonical version on this basis:
// 1) The field being overwritten must be have different values in the oldData and newData
// 2) The field's value must be the same in oldData and dbDoc -- otherwise return {cancel: true}

Mongol.diffUpdateData = function (dbDoc, newData, oldData) {

  var finalData = {};
  var cancel = false;

  var dbDocFields = _.keys(dbDoc),
    newDataFields = _.keys(newData);
    // oldDataFields = _.keys(oldData);
    
    // console.log("dbDocFields",dbDocFields); console.log("newDataFields",newDataFields); console.log("oldDataFields",oldDataFields);
    // console.log("dbDoc",dbDoc); console.log("newData",newData); console.log("oldData",oldData);

  var oldAndNewFields = _.union(dbDocFields, newDataFields);

  _.each(oldAndNewFields, function(field) { // console.log(field);
    // console.log("Old data:",oldData[field]);console.log("New data:",newData[field]);
    if (_.isEqual(oldData[field], newData[field])) { // console.log("Equal");
      
      // Just use the canonical version of this field
      if (!_.isUndefined(dbDoc[field])) { // console.log("Not undefined");
         
        finalData[field] = dbDoc[field];
           
      }
      else {
        
        // This field comes from a stale doc version and is not relevant
        return;
        
      }
          
    }
    else {
      // console.log("Not equal");
      // Okay, game on. This is a field that needs to get the newDoc value
    
      if (_.isObject(newData[field]) && !_.isArray(newData[field]) && !_.isArray(newData[field])) {
        // console.log("Is object:", newData[field]);
        // Recurse into subdocuments
        var diffedSubdocument = Mongol.diffUpdate(dbDoc[field] || {}, newData[field], oldData[field] || {}); 
        finalData[field] = diffedSubdocument.finalData;
        
      }
      else {
        // console.log("Not object:", newData[field]);
        // Check that the oldData and dbDoc fields have the same value
        // If they don't, something has mutated the doc since this transaction
      
        if (_.isEqual(oldData[field], dbDoc[field])) {
          // console.log("No conflict:", oldData[field], dbDoc[field]);
          finalData[field] = newData[field];
          
        }
        else {
          // console.log("Cancelled");
          cancel = true;
            
        }
        
      }
      
    }

  });
  // console.log("Final data:",finalData);
  return {diffedDocument: finalData, cancel: cancel};

};
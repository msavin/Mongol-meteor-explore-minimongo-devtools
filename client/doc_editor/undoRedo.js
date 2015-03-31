// Undo Redo for Mongol

Template.Mongol_undoRedo.helpers({
  stack: function (type) {
	var key = UndoRedo.makeKey(String(this), (type === 'redo') ? 'undone' : 'done');
	var stack = Session.getJSON(key);
	var latest = _.isArray(stack) && stack.length && stack[stack.length - 1]; // console.log("latest " + key + ":",latest);
	return latest; 
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
  return 'Mongol_undoRedo.' + collection + '.' + stack;
}

// Add an action to the "done" stack for a given collection

// data is an object of the form:
//   { action: "update", document: <DOCUMENT BEFORE UPDATE> }
//   { action: "insert", document: <DOCUMENT INSERTED> }
//   { action: "remove", document: <DOCUMENT BEFORE REMOVE> }

UndoRedo.add = function (collection, data) {
  var doneStackKey = UndoRedo.makeKey(collection, 'done');
  var undoneStackKey = UndoRedo.makeKey(collection, 'undone');
  var doneStack = _.clone(Session.getJSON(doneStackKey));
  if (!_.isArray(doneStack)) {
    doneStack = [];  
  }
  doneStack.push(data);
  Session.setJSON(doneStackKey, doneStack);
  // Clear the undone stack on every new action
  Session.setJSON(undoneStackKey, []);
}

UndoRedo.undo = function (collection, redo) {
  var Collection = Mongo.Collection.get(collection);
  var doneStackKey = UndoRedo.makeKey(collection, 'done');
  var undoneStackKey = UndoRedo.makeKey(collection, 'undone');
  var doneStack = Session.getJSON(doneStackKey);
  var undoneStack = Session.getJSON(undoneStackKey);
  // console.log("collection:",collection);console.log("doneStackKey:",doneStackKey);console.log("undoneStackKey:",undoneStackKey);console.log("doneStack:",doneStack);console.log("undoneStack:",undoneStack);
  var setStacks = function () {
	Session.setJSON(doneStackKey, doneStack);
	Session.setJSON(undoneStackKey, undoneStack);
  }
  // Get the latest thing on the done stack
  var currentStack = (redo) ? undoneStack : doneStack;
  var latestAction = _.isArray(currentStack) && currentStack.length && currentStack.pop();
  if (!latestAction) {
	// Fix stack up and try again if there is another action available
	setStacks();
	if (currentStack.length) {
	  UndoRedo.undo(collection, redo);
	}
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
	  var currentDoc = Collection.findOne({_id: doc._id});
	  /*console.log("redo:",redo);
	  console.log("collection:",collection);
	  console.log("latestAction:",latestAction);
	  console.log("doc:",doc);
	  console.log("currentDoc:",currentDoc);*/
	  if (!currentDoc) {
		// This document no longer exists, we need to remove the action from the stack
		if (redo) {
		  doneStack.pop();
		}
		else {
		  undoneStack.pop();
		}
		setStacks(); 
		alert('This document is not available for updates anymore');
	    return;  
	  }
	  var docVersion = (redo) ? latestAction.updatedDocument : doc;
	  Meteor.call('Mongol_update', collection, docVersion, currentDoc, function (err, res) {
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
}
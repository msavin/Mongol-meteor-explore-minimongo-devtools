Session.setDefault('Mongol_action_log', []);

var addStatus = function (stack, status) {
  return _.map(stack, function (action) { return _.extend(action, {status: status})})	
}

Tracker.autorun(function() {
  // Splice together all the actions taken and order by timestamp
  var memo = [];
  /*var collections = Mongo.Collection.getAll();
  var actions = _.reduce(collections, function (memo,collection) {
	var collectionName = collection.name;*/
	_.each(['done','undone'], function (status) {
	  var stack = Session.getJSON(UndoRedo.makeKey(null, status)); // collectionName
	  if (stack) {
		memo = memo.concat(addStatus(stack, status));
	  }
	});/*
	return memo;
  },[]);*/
  var sortedActions = _.sortBy(memo, function(action) { // actions instead of memo
	return action.timestamp;
  });
  Session.set('Mongol_action_log', sortedActions.reverse());
});

Template.Mongol_actions.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "actions_618")) {
      return "Mongol_row_expand";
    }
  },
  actions: function () {
	if (Session.equals("Mongol_currentCollection", "actions_618")) {
	  return Session.get('Mongol_action_log');
	}
  },
  stack: function() {
	var stack = (addStatus(Session.getJSON(UndoRedo.makeKey(null, 'undone')) || [],'undone').concat(addStatus(Session.getJSON(UndoRedo.makeKey(null, 'done')) || [],'done'))).reverse();
	return stack;  
  }
});

Template.Mongol_actions.events({
  'click .Mongol_row': function () {
	if (Session.equals("Mongol_currentCollection", "actions_618")) {
	  Session.set("Mongol_currentCollection", null);
	} else {
	  Session.set("Mongol_currentCollection", "actions_618");
	}
  },
  'click #Mongol_actions_618 .Mongol_contentView' : function (evt) {
	evt.stopPropagation();  
  },
  'click .Mongol_log_purge' : function () {
	_.each(['done','undone'], function (status) {
	  Session.setJSON(UndoRedo.makeKey(null, status),[]);
	});
  }
});

Template.Mongol_global_undo_redo.helpers({
  stack: function (type) {
	return _.find(this, function (action) { return action.status === ((type === 'redo') ? 'undone' : 'done'); });
  },
  json: function () {
	return JSON.stringify(this.updatedDocument || this.document);  
  }
});

Template.Mongol_global_undo_redo.events({
  'click .undo-button, click .redo-button' : function (evt) {
    evt.stopPropagation();
    var type = ($(evt.currentTarget).hasClass('redo-button')) ? 'redo' : 'undo';
	if (type === 'redo') {
	  var redo = true;
	  UndoRedo.undo(this, redo);
	}
	else {
	  UndoRedo.undo(this);
	}
  }
});

Template.Mongol_action.helpers({
  time : function () {
	var time = (new Date(this.timestamp)).toTimeString();
	return time.substr(0,8);	
  },
  fullDoc : function () {
	return Blaze._templateInstance().showFullDocument.get();
  },
  json : function () {
    json_output = JSON.stringify(this.updatedDocument || this.document, null, 2),
    colorized = MongolPackage.colorize(json_output);
    return colorized;
  },
  singleAction : function () {
	return [this];  
  }
});

Template.Mongol_action.events({
  'click .Mongol_toggle_document' : function(evt,tmpl) {
    evt.preventDefault();
    evt.stopPropagation();
    var state = tmpl.showFullDocument;
	state.set(!state.get());
  }
});

Template.Mongol_action.onCreated(function () {
  this.showFullDocument = new ReactiveVar(false);
});
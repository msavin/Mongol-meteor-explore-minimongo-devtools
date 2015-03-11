Template.Mongol_subscriptions.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "subscriptions_618")) {
      return "Mongol_row_expand";
    }
  },
  subscription: function () {
    // Not yet reactive
    var subscriptions = Meteor.default_connection._subscriptions,
        subKeys       = Object.keys(subscriptions),
        subs          = [];

    $.each(subKeys, function(index, value ) {
      subs.push(subscriptions[value])
    });

    return subs;
  },
  params: function () {
    if (this.length === "0") {
      return params;
    } else {
      return "none";
    }
  }
});


Template.Mongol_subscriptions.events({
  'click .Mongol_toggle_selected_collection': function () {
    if (Session.equals("Mongol_currentCollection", "subscriptions_618")) {
      Session.set("Mongol_currentCollection", null);
    } else {
      Session.set("Mongol_currentCollection", "subscriptions_618");
    }
  },
  'click .Mongol_subscription_toggle': function () {
    this.stop()
    alert("you stopped me");
  }
});


// Ssh.. this is supposed to be a surprise :)

// Object for subscriptions
// var subscriptions = Meteor.default_connection._subscriptions
// Object.observe polyfill

// Template.Mongol_subscriptions.helpers({
//  subscription: function () {
//    var data = MongolSubData.get()
//    return data;
//  },
//  subscriptionParams: function() {
//    return this.params
//  }
// });

// Template.Mongol_subscriptions.events({
//  'click .Mongol_stop_subscription': function () {
//    this.stop()
//  },
//  'click #createNewSub': function () {

//    var argument = false,
//      stuff = [];
    
//    var askForArgument = function () {
//      argument = prompt("What is the name of your subscription?");
//      addArgument(argument);
//    }
    
//    var addArgument = function (argument) {
//      if (argument) {
//        stuff.push(argument);
//        askForArgument();
//      } else {
//        Meteor.subscribe.apply(Meteor, stuff); 
//      }
//    }

//    askForArgument();

//  }
// });
Template.Mongol_subscriptions.helpers({
  subscription: function () {

    var subscriptionIDs = Session.get("MeteorToys_PubSub")
    return subscriptionIDs;

  },
  name: function () {
    var subName = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].name;
    return subName;
  },
  params: function () {
    var p = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].params

    if (p && p.length > 0) {
      return p;
    } else {
      return "none";
    }
  },
  subType: function () {
    
    if (!Object.observe) {
      return "Polling every 3 seconds"
    } else {
      return "Observing Changes";
    }
    
  }
});


  Template.Mongol_subscriptions.events({
    'click .Mongol_subscription_toggle': function () {
      Meteor.default_connection._subscriptions[this].stop()
    }
  });


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
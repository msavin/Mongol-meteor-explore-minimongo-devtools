Template.Mongol_subscriptions.helpers({
  subscription: function () {

    var subscriptionIDs = MeteorToysDict.get("MeteorToys_PubSub")
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


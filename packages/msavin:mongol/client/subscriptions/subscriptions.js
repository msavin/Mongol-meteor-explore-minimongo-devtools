// Ssh.. this is supposed to be a surprise :)

// Object for subscriptions
// var subscriptions = Meteor.default_connection._subscriptions
// Object.observe polyfill

// Template.Mongol_subscriptions.helpers({
// 	subscription: function () {
// 		var data = MongolSubData.get()
// 		return data;
// 	},
// 	subscriptionParams: function() {
// 		return this.params
// 	}
// });

// Template.Mongol_subscriptions.events({
// 	'click .Mongol_stop_subscription': function () {
// 		this.stop()
// 	},
// 	'click #createNewSub': function () {

// 		var argument = false,
// 			stuff = [];
		
// 		var askForArgument = function () {
// 			argument = prompt("What is the name of your subscription?");
// 			addArgument(argument);
// 		}
		
// 		var addArgument = function (argument) {
// 			if (argument) {
// 				stuff.push(argument);
// 				askForArgument();
// 			} else {
// 				Meteor.subscribe.apply(Meteor, stuff); 
// 			}
// 		}

// 		askForArgument();

// 	}
// });
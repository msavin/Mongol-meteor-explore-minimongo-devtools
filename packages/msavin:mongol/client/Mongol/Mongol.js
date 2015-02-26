Template.Mongol.helpers({
    'Mongol_enabled': function () {
        var MongolConfig = Session.get("Mongol");
        return MongolConfig && MongolConfig.display;
    },
    Mongol_collections: function () {
        var MongolConfig = Session.get("Mongol");
        return MongolConfig && MongolConfig.collections || [];
    },
    active: function () {
        var MongolCollection = Session.get("Mongol_currentCollection")
        if (MongolCollection !== false && MongolCollection !== null) {
            return "Mongol_expand";
        }
    },
    Mongol_configured: function () {
		// Note: Mongol will always be configured by default
        var MongolConfig = Session.get("Mongol");
        if (MongolConfig) {
            return true;
        }
    }
});

Template.Mongol.rendered = function () {
    
    var configuration = Session.get("Mongol");

    if (configuration) {

        // hot keys
        $(document).keydown(function(e) {
            if (e.keyCode === 77 && e.ctrlKey) {
               MongolPackage.toggleDisplay();
            }
        });

        if (!configuration.disable_warning) {
            MongolPackage.startup();
        }

    }


};


// MongolSubData = new ReactiveVar;




// setInterval(function() { 

//  var subs   = Meteor.connection._subscriptions,
//      array1 = _.map(subs, function(num, key) { return num; });

//  MongolSubData.set(array1)

// }, 1000);
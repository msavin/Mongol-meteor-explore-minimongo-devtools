Template.Mongol.helpers({
    'Mongol_enabled': function () {
        var Mongol = Session.get("Mongol");
        return Mongol.display;
    },
    Mongol_collections: function () {
        var Mongol = Session.get("Mongol");
        return Mongol.collections;
    },
    active: function () {
        var Mongol = Session.get("Mongol_currentCollection")
        if (Mongol != false && Mongol != null) {
            return "Mongol_expand";
        }
    },
    Mongol_configured: function () {
        var Mongol = Session.get("Mongol");
        if (Mongol) {
            return true;
        }
    }
});

Template.Mongol.rendered = function () {
    
    var configuration = Session.get("Mongol");

    if (configuration) {

        // hot keys
        $(document).keydown(function(e) {
            if (e.keyCode == 77 && e.ctrlKey) {
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
Template.Mongol.helpers({
    'Mongol_enabled': function () {
        var MongolConfig = Session.get("Mongol_settings_display");
        return MongolConfig;
    },
    Mongol_collections: function () {
        var MongolConfig = Session.get("Mongol");
        return MongolConfig.collections;
    },
    active: function () {
        var MongolCollection = Session.get("Mongol_currentCollection")
        if (MongolCollection) {
            return "Mongol_expand";
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
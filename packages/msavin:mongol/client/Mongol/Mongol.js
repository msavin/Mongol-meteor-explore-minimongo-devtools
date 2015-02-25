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


Template.Mongol.helpers({
    'Mongol_enabled': function () {
<<<<<<< HEAD
<<<<<<< HEAD
        var MongolConfig = Session.get("Mongol_settings_display");
        return MongolConfig;
=======
        var MongolConfig = Session.get("Mongol");
        return MongolConfig && MongolConfig.display;
>>>>>>> 6f4f0a428a80a74497fee63895fef1d42f0b21c9
=======
        var MongolConfig = Session.get("Mongol_settings_display");
        return MongolConfig;
>>>>>>> origin/master
    },
    Mongol_collections: function () {
        var MongolConfig = Session.get("Mongol");
        return MongolConfig && MongolConfig.collections || [];
    },
    active: function () {
        var MongolCollection = Session.get("Mongol_currentCollection")
        if (MongolCollection) {
            return "Mongol_expand";
        }
    }
});


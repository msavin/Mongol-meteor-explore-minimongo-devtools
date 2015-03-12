Template.splash.helpers({
	active: function () {
		var active = Session.get("SplashPage");
		return active;
	}
});

Template.splash.events({
	'click .splash': function() {
		Session.set("SplashPage", false);
		Session.set("Mongol_settings_display", true);
	}
})
  // Set Mongol to Display
  // When User Clicks Controls + M

  Session.set("SplashPage", true);

  $(document).keydown(function (e) {
    if (e.keyCode === 77 && e.ctrlKey) {
      Session.set("SplashPage", false)
    }
  });



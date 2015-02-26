// Note `rendered` fails in some situations, use `created`

Template.body.created = function () {

    // Set Mongol to Display
    // When User Clicks Controls + M

    $(document).keydown(function(e) {
        if (e.keyCode === 77 && e.ctrlKey) {
           MongolPackage.toggleDisplay();
        }
    });

    // Educate about Mongol package

    MongolPackage.startup();

};

// Below is a working alternative to Template.body.created
// Past experience says that adding this package as a
// dependency will make the following approach more robust
// api.use('gwendall:body-events@0.1.4', 'client');

/*Blaze.body.events({
  'keydown body' : function(e) {
    if (e.keyCode === 77 && e.ctrlKey) {
	   MongolPackage.toggleDisplay();
	}
  }
});*/
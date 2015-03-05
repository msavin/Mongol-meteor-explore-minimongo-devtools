//
//  Re-Note: `rendered`, `created`, `destroyed` should not be used on body, window, or document.
//  Essentially not on `unique` items which can have the values you just set overwritten by the
//  next package that is loaded.
//
//  For a 'when ready' hook use 'Meteor.startup' called when the DOM is ready
//  http://docs.meteor.com/#/full/meteor_startup
//

Meteor.startup(function(){

  // Set Mongol to Display
  // When User Clicks Controls + M

  $(document).keydown(function (e) {
    if (e.keyCode === 77 && e.ctrlKey) {
      MongolPackage.toggleDisplay();
    }
	// if (e.keyCode === 70 && e.ctrlKey) {
	//   MongolPackage.toggleFullScreen();	
	// }
  });

  // Educate about Mongol package

  MongolPackage.startup();

});

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
Template.body.rendered = function () {

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
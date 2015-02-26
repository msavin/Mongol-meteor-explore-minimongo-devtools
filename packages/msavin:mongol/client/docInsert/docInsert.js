Template.Mongol_docInsert.events({
  'click .Mongol_docMenu_insert': function () {

    var CollectionName = String(this),
      newDataID = "Mongol_" + String(this) + "_newEntry";
    var newData = document.getElementById(newDataID).textContent;
    var newObject = MongolPackage.parse(newData);

    if (newObject) {
      Meteor.call('Mongol_insert', CollectionName, newObject, function (error, result) {
        if (!error) {
          sessionKey = "Mongol_" + CollectionName;
          // FIXME: something is strange here. Code below uses the variable above as string !? - typo?
          Session.set("sessionKey", "0");
        } else {
          MongolPackage.error("insert");
        }
      });
      // if successful, set the proper session
    }

  }
});

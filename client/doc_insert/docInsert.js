Template.Mongol_docInsert.events({
  'click .Mongol_docMenu_insert': function () {

    var CollectionName = String(this),
        newDataID      = "Mongol_" + String(this) + "_newEntry",
        newData        = document.getElementById(newDataID).textContent,
        newObject      = MongolPackage.parse(newData);

    if (newObject) {
      Meteor.call('Mongol_insert', CollectionName, newObject, function (error, result) {
        if (!error) {
          sessionKey = "Mongol_" + CollectionName;
          Session.set(sessionKey, 0);
        } else {
          MongolPackage.error("insert");
        }
      });
    }

  }
});

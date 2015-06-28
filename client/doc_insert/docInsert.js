Template.Mongol_docInsert.events({
  'click .Mongol_docMenu_insert': function () {

    var CollectionName = String(this),
        newDataID      = "Mongol_" + String(this) + "_newEntry",
        newData        = document.getElementById(newDataID).textContent,
        newObject      = Mongol.parse(newData);

    if (newObject) {
      Meteor.call('Mongol_insert', CollectionName, newObject, function (error, result) {
        if (!error) {
          sessionKey = "Mongol_" + CollectionName;
          MeteorToysDict.set(sessionKey, 0);
        } else {
          Mongol.error("insert");
        }
      });
    }

  }
});

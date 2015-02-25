if (Meteor.isClient) {

    Template.Mongol_docViewer.helpers({
        activeDocument: function () {
			var collectionName    = String(this);
            var currentCollection = Mongol.Collection(collectionName);
			var documents         = currentCollection.find().fetch();
            var sessionKey  = "Mongol_" + String(this);
            var docNumber   = Session.get(sessionKey);
            var docCurrent  = documents[docNumber];
			return docCurrent;
		},
        documentJSON: function () {
			var docCurrent = this;
            var json_output = JSON.stringify(docCurrent, null, 2);
                
                if (! (typeof json_output === "undefined")) {
                    colorize    = MongolPackage.colorize(json_output);
                } else {
                    colorize    = json_output;
                }

                return colorize;

        },
        editContent: function () {
            
            var editMode = Session.get("Mongol_editMode");
            
            if (editMode) {
                return "true";
            }

        },
        editStyle: function () {
            
            var editMode = Session.get("Mongol_editMode");
            
            if (editMode) {
                return "Mongol_editable";
            }
            
        },
        notEmpty: function() {
            documentCount = Mongol.Collection(String(this)) && Mongol.Collection(String(this)).find().count();
            if (documentCount >= 1) {
                return true;
            }
        }
    });

    
}
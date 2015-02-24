if (Meteor.isClient) {

    Template.Mongol_docViewer.helpers({
        documentJSON: function () {
            
            var currentCollection = window[this],
                documents   = currentCollection.find().fetch(),
                sessionKey  = "Mongol_" + this;
                docNumber   = Session.get(sessionKey),
                docCurrent  = documents[docNumber],
                json_output = JSON.stringify(docCurrent, null, 2);
                
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
                return "true"
            }

        },
        editStyle: function () {
            
            var editMode = Session.get("Mongol_editMode");
            
            if (editMode) {
                return "Mongol_editable"
            }
            
        },
        active: function() {
            documentCount = window[this].find().count()
            if (documentCount >= 1) {
                return true
            }
        }
    });

    
}
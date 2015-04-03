Package.describe({
  name:    'msavin:mongol',
  summary: 'The insanely handy development package for Meteor.',
  version: '1.1.0',
  git:     'https://github.com/msavin/Mongol.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {

  var clientFiles = [
    "style/Mongol.css",
    "client/row_header/header.html",
    "client/row_header/header.js",
    "client/row_account/account.html",
    "client/row_account/account.js",
    "client/row_account/accountViewer.html",
    "client/row_account/accountViewer.js",
    "client/row_collection/collections.html",
    "client/row_collection/collections.js",
    "client/doc_editor/docViewer.html",
    "client/doc_editor/docViewer.js",
	"client/doc_editor/undoRedo.html",
	"client/doc_editor/undoRedo.js",
    "client/doc_insert/docInsert.html",
    "client/doc_insert/docInsert.js",
    "client/row_subscriptions/subscriptions.html",
    "client/row_subscriptions/subscriptions.js",
    "client/row_actions/actions.html",
    "client/row_actions/actions.js",
    "client/Mongol.html",
    "client/Mongol.js",
    "client/doc_controls/docControls.html",
    "client/doc_controls/docControls.js"
  ];

  var serverFiles = [
    "server/methods.js",
    "server/utility_functions.js"
  ];
  
  var commonFiles = [
    "common/common.js"
  ];

  api.versionsFrom('1.0');
  api.use(['templating','tracker','mongo','session','underscore','reactive-var'], 'client');
  api.use('aldeed:collection2@2.3.3', {weak: true}); // This must go before: api.use('dburles:mongo-collection-instances@0.3.3');
  api.use('dburles:mongo-collection-instances@0.3.3', 'client');
  api.use('gwendall:session-json@0.1.7', 'client');
  api.use('babrahams:editable-json@0.4.3');
  api.use('fortawesome:fontawesome@4.3.0', 'client');
  api.use('meteortoys:toykit@0.2.2');

  api.add_files(commonFiles);
  api.add_files(clientFiles, "client");
  api.add_files(serverFiles, "server");
  
  if (api.export) {
    // Should consolidate the two
    api.export('Mongol', "client");
    api.export('MongolPackage', "client");
  }

});
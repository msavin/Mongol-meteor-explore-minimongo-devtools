Package.describe({
  name:    'msavin:mongol',
  summary: 'The insanely handy development package for Meteor.',
  version: '1.0.26',
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
    "client/row_collection_notFound/notFound.html",
    "client/row_collection_notFound/notFound.js",
    "client/row_collection/collections.html",
    "client/row_collection/collections.js",
    "client/doc_editor/docViewer.html",
    "client/doc_editor/docViewer.js",
    "client/doc_insert/docInsert.html",
    "client/doc_insert/docInsert.js",
    "client/_component/component.html",
    "client/_component/component.js",
    "client/row_subscriptions/subscriptions.html",
    "client/row_subscriptions/subscriptions.js",
    "client/main.html",
    "client/main.js",
    "client/functions.js",
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
  api.use(['templating','tracker','mongo','session'], 'client');
  api.use('aldeed:collection2@2.3.2', {weak: true}); // This must go before: api.use('dburles:mongo-collection-instances@0.3.1');
  api.use('dburles:mongo-collection-instances@0.3.3', 'client');
  api.use('babrahams:editable-json@0.4.3');
  api.use('meteortoys:toykit@0.3.5');

  api.add_files(commonFiles);
  api.add_files(clientFiles, "client");
  api.add_files(serverFiles, "server");
  
  if (api.export) {
    // Should consolidate the two
    api.export('Mongol', "client");
    api.export('MongolPackage', "client");
  }

});
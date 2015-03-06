Package.describe({
  name:    'msavin:mongol',
  summary: 'The insanely handy development package for Meteor.',
  version: '0.6.5',
  git:     'https://github.com/msavin/Mongol.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {

  var clientFiles = [
    "client/style/Mongol.css",
    "client/mongol_functions.js",
    "client/header/header.html",
    "client/header/header.js",
    "client/account/account.html",
    "client/account/account.js",
    "client/account/accountViewer.html",
    "client/account/accountViewer.js",
    "client/collections/collections.html",
    "client/collections/collections.js",
    "client/docViewer/docViewer.html",
    "client/docViewer/docViewer.js",
    "client/docInsert/docInsert.html",
    "client/docInsert/docInsert.js",
    "client/subscriptions/subscriptions.html",
    "client/subscriptions/subscriptions.js",
    "client/Mongol/Mongol.html",
    "client/Mongol/Mongol.js",
    "client/Mongol/body.html",
    "client/Mongol/body.js",
    "client/docControls/docControls.html",
    "client/docControls/docControls.js",
  	"client/defaults/defaults.js"
  ];

  var serverFiles = [
    "server/methods.js",
    "server/utility_functions.js"
  ];
  
  var commonFiles = [
    "common/common.js"
  ];

  api.versionsFrom('1.0');
  api.use(['templating','tracker','mongo'], 'client');
  api.use('aldeed:collection2@2.3.2', {weak: true}); // This must go before: api.use('dburles:mongo-collection-instances@0.3.1');
  api.use('dburles:mongo-collection-instances@0.3.1');
  api.add_files(commonFiles);
  api.add_files(clientFiles, "client");
  api.add_files(serverFiles, "server");
  
  if (api.export) {
    api.export('Mongol', "client");
  }

});
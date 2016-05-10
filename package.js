Package.describe({
  name:    'msavin:mongol',
  summary: 'In-App MongoDB Editor',
  version: '2.0.0',
  git:     'https://github.com/msavin/Mongol.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  
  var serverFiles = [
    "server/methods.js",
    "server/utilities.js"
  ];
  
  api.versionsFrom("1.0");

  // This must go before: api.use('dburles:mongo-collection-instances@0.3.1');
  // Weak dependency: only used if app contains package 
  api.use('aldeed:collection2@2.3.2', {weak: true});   

  api.use('dburles:mongo-collection-instances@0.3.4');
  api.use(["underscore","check"], "server")

  api.add_files(serverFiles, "server");

});
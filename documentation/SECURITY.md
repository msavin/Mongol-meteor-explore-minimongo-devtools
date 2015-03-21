Security & "debugOnly"
-----------------------

Mongol comes with <a href="https://github.com/msavin/Mongol/blob/master/packages/msavin:mongol/server/methods.js"> a special set of methods</a> that give it full access to your database through the server. These methods allow Mongol to insert, update and remove any document on your database. It's great for development purposes because it allows you to use your application in it's natural state while giving you the flexibility to make quick document edits.

When you deploy your Meteor application (`meteor deploy xxx`), Meteor will automatically remove the package from the codebase because its a "<a href="https://www.meteor.com/blog/2014/10/13/meteor-094-mobile-and-testing">`debugOnly`</a>" package. However, if you deploy in debug mode (`meteor deploy xxx --debug`), you will upload Mongol's methods with it. In the case that you are deploying your application in debug mode, you should remove the package, or you'd leave the methods exposed.
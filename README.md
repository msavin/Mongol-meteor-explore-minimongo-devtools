Mongol
======

[![Join the chat at https://gitter.im/msavin/Mongol](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/msavin/Mongol?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Meet Mongol, the insanely handy development package for Meteor. Starting today, you'll never have to enter the console to play with your collections again. To get started, simply run:

	meteor add msavin:mongol

Mongol does not require configuration. To turn it on, press Control + M.


Browse Your Collections
-----------------------
Mongol will automatically detect your collections and display the documents that you are subscribing to. Click on the collection name to see what it contains.


Easily Modify Your Documents
----------------------------
<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/public/video/gif.gif"></a><br>
Mongol is able to insert, update and/or remove any document in your database, regardless if you have insecure on or if the permissions to allow it. Read the security section to learn how this works. 


Hot Key Activation
------------------
Mongol won't render into the DOM until you activate it. To activate, press <strong>Control + M</strong>.


Security & "debug-only"
-----------------------
Mongol comes with <a href="https://github.com/msavin/Mongol/blob/master/packages/msavin:mongol/server/methods.js"> a special set of methods</a> that give it full access to your database through the server. These methods allow Mongol to insert, update and remove any document on your database. It's great for development purposes because it allows you to use your application in it's natural state while giving you the flexibility to make quick document edits.

When you deploy your Meteor application (`meteor deploy xxx`), Meteor will automatically remove the package from the codebase because its a "<a href="https://www.meteor.com/blog/2014/10/13/meteor-094-mobile-and-testing">`debug-only`</a>" package. However, if you deploy in debug mode (`meteor deploy xxx --debug`), you will upload Mongol's methods with it. In the case that you are deploying your application in debug mode, you should remove the package, otherwise you'd leave the Mongol's methods exposed.


Additional Information
----------------------
 - Licensed under <a href="https://github.com/msavin/Mongol/blob/master/LICENSE.md">MIT</a>
 - Live Demo: http://mongol.meteor.com
 - Atmosphere: https://atmospherejs.com/msavin/mongol
 - GitHub: https://github.com/msavin/Mongol/
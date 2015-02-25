Mongol
======
Meet Mongol, the insanely handy development package for Meteor. Starting today, you'll never have to enter the console to play with your data again. To enjoy the productivity boost, simply run:

	meteor add msavin:mongol

In version 0.4.0, Mongol gained support for automatic collection detection. Please report how its working to GitHub. Thanks JackAdams! 

Browse Your Collections
-----------------------
Mongol will automatically detect your collections, and display the documents that you are subscribing to. Click on the collection name to see what it contains.


Easily Modify Your Documents
----------------------------
<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/public/video/gif.gif"></a><br>
Through a special set of methods, Mongol is able to insert, update and remove any document that you ask it to, regardless if you have insecure on or the permissions to allow it. 


Hot Key Activation
------------------
Mongol won't render into the DOM until you trigger it. When you need it, simple press CONTROL + M and it'll pop right up.


Security & "debug-only"
-----------------------
Mongol is able to edit any document in your database, regardless of whether you have insecure on or the permissions to allow it. It does so through <a href="https://github.com/msavin/Mongol/blob/master/packages/msavin:mongol/server/methods.js">a special set of methods</a> that allow it execute virtually any code on the server. This is great because it allows you to use your application in its "natural" state, while helping you make quick database edits.

When you deploy your Meteor application (`meteor deploy xxx`), Meteor will automatically remove the package from the codebase because its a "<a href="https://www.meteor.com/blog/2014/10/13/meteor-094-mobile-and-testing">`debug-only`</a>" package. However, if you deploy it in debug mode (`meteor deploy xxx --debug`), you will upload Mongol's methods with it. In the case that you are deploying your application in debug mode, you should remove the package before pushing it.


Additional Information
----------------------
 - Licensed under MIT: https://github.com/msavin/Mongol/blob/master/LICENSE.md
 - Live Demo: http://mongol.meteor.com
 - Atmosphere: https://atmospherejs.com/msavin/mongol
 - GitHub: https://github.com/msavin/Mongol/
 - Created by <a href="http://maxsavin.com">Max Savin</a>
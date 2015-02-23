Mongol
======
Meet Mongol, the insanely handy development package for Meteor. You'll never have to enter the console to play with your data again. To enjoy the productivity boost, simple run:

	meteor add msavin:mongol


Browse Your Collections
-----------------------
Mongol will automatically monitor your collections, and display the documents that you are subscribing to. Click on the collection name to see what it contains.


Easily Modify Your Documents
----------------------------
<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/public/video/gif.gif"></a><br>
Through a special set of methods, Mongol is able to insert, update and remove any document that you ask it to, regardless if you have insecure on or the permissions to allow it. 


Hot Key Activation
------------------
Mongol won't render into the DOM until you tell it to do so. When you need it, simple press CONTROL + M and it'll be right there. 


Security & "debug-only"
-----------------------
Mongol is able to edit any document in your database, regardless of whether you have insecure on or the permissions to allow it. It does so through a special set of methods that allow it execute virtually any code on the server. This is great because it allows you to use your application in its natural" state, while helping you make quick database edits when you need to.

When you deploy your Meteor application (meteor deploy xxx), Meteor will automatically remove the package from the codebase because its a "debug-only" package. However, if you deploy it in debug mode (meteor deploy xxx --debug), you will upload Mongol's methods with it. If that case that you are deploying your application in debug mode, you should remove the package before pushing it.


Additional Information
----------------------
 - Licensed under MIT: https://github.com/msavin/Mongol/blob/master/LICENSE.md
 - Live Demo: http://mongol.meteor.com
 - Created by <a href="http://maxsavin.com">Max Savin</a>
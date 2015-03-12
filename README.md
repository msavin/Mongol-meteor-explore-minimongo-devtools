

Mongol [![Join the chat at https://gitter.im/msavin/Mongol](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/msavin/Mongol?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
==================

Meet Mongol, the insanely handy development package for Meteor. Starting today, you'll never have to enter the console to play with your collections again. To get it, simply run:

	meteor add msavin:mongol

Mongol does not require configuration. To turn it on, press Control + M.

<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/public/video/gif.gif"></a>


Browse Your Collections
-----------------------
Mongol will automatically detect your collections and display the documents that you are subscribing to. Click on the collection name to see what it contains.


Easily Modify Your Documents
----------------------------
Mongol is able to insert, update and/or remove any document in your database, regardless if you have insecure on or if the permissions to allow it. Read the security section to learn how this works. 


Hot Key Activation
------------------
Mongol won't render into the DOM until you activate it. To activate, press <strong>Control + M</strong>. You can enable it manually with `Session.set("Mongol_settings_display", true)`.


Additional Information
----------------------
 - Must Read: <a href="https://github.com/msavin/Mongol/blob/master/SECURITY.md">Mongol & Security</a> 
 - Troubleshooting: <a href="https://github.com/msavin/Mongol/blob/master/COMPATIBILITY.md">Mongol & Package Compatibility</a>
 - Licensed under <a href="https://github.com/msavin/Mongol/blob/master/LICENSE.md">MIT</a>
 - Live Demo: http://mongol.meteor.com
 - Atmosphere: https://atmospherejs.com/msavin/mongol
 - GitHub: https://github.com/msavin/Mongol/
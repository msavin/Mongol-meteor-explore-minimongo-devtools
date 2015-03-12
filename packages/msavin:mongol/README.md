

Mongol 1.0 Preview [![Join the chat at https://gitter.im/msavin/Mongol](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/msavin/Mongol?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
==================

Meet Mongol, the insanely handy development package for Meteor. Starting today, you'll never have to enter the console to play with your collections again. Get started with: 

	meteor add msavin:mongol

Mongol configures automatically. Press <strong>Control + M</strong> to toggle it.

<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/public/video/gif.gif"></a>


Browse Your Collections
-----------------------
Mongol will automatically detect your collections and display your client-side documents. You can always see how many documents you are subscribing to, and then browse them visually. 


Easily Modify Your Documents
----------------------------
Mongol is able to insert, update and/or remove any document in your database, regardless if you have `insecure` or the permissions to allow it. Read the <a href="https://github.com/msavin/Mongol/blob/master/SECURITY.md">security</a> post to learn how this works. 

Watch Your Subscriptions
------------------------
Mongol allows you to view all of your data subscriptions, along with their details. You can turn any subscription off by pressing the X button.

Only There When You Want It
---------------------------
Mongol won't render into the DOM until you activate it. You can activate by pressing <strong>Control + M</strong>, or with `Session.set("Mongol_settings_display", true)`.


Additional Information
----------------------
 - <a href="https://github.com/msavin/Mongol/blob/master/SECURITY.md">Mongol & Security</a> (Must Read)
 - <a href="https://github.com/msavin/Mongol/blob/master/COMPATIBILITY.md">Mongol & Package Compatibility</a>
 - <a href="https://github.com/msavin/Mongol/blob/master/CHANGELOG.md">Mongol Changelog</a>
 - <a href="https://atmospherejs.com/msavin/mongol">On Atmosphere</a>
 - <a href="https://github.com/msavin/Mongol/">On GitHub</a>
 - <a href="https://github.com/msavin/Mongol/blob/master/LICENSE.md">Licensed under MIT</a>
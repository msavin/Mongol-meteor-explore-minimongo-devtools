Mongol <a href="http://meteor.toys"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/documentation/badge.png"></a>
==================

Meet Mongol, the insanely handy development package for Meteor. Starting today, you'll never have to enter the console to play with your collections again. Instead, Mongol lets you view and modify your client side documents in the browser. And because Mongol is a debugOnly package, it does not compile to production code.

Your Documents, At a Glance
----------------------------
Mongol will automatically detect your collections and display your client-side documents. A reactive count of the documents is always in your sight, and browsing them is just a click away.

<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/documentation/screenshots/1.png"></a>
 
Easily View & Modify Documents
------------------------------
Mongol is able to insert, update and/or remove any document in your database, regardless if you have `insecure` on or the permissions to allow it. Read the <a href="https://github.com/msavin/Mongol/blob/master/documentation/SECURITY.md">security</a> post to learn how this works.

<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/documentation/screenshots/2.png"></a>

Only There When You Want It
---------------------------
Mongol won't render into the DOM until you activate it. You can activate by pressing Control + M, or with `Session.set("MeteorToys_display", true)`.

<a href="http://mongol.meteor.com"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/documentation/screenshots/4.png"></a>

"Plug & Play" Installation
---------------------------

Mongol configures automatically. To get started, simply run:

	$ meteor add msavin:mongol

After installation, press Control + M to toggle it. To see a demo, go to http://mongol.meteor.com.

Mongol Pro
----------
Mongol Pro is available as part of the Meteor Toys suite. The Pro version allows you to reset your MongoDB collections and includes a trash can for restoring removed documents. To see the other tools available, go to the <a href="http://meteor.toys">Meteor Toys</a> website.

Additional Information
----------------------
 - Available on <a href="https://github.com/msavin/Mongol/">GitHub</a> and <a href="https://atmospherejs.com/msavin/mongol">Atmosphere</a>
 - Documentation: <a href="https://github.com/msavin/Mongol/blob/master/documentation/SECURITY.md">Security</a>, <a href="https://github.com/msavin/Mongol/blob/master/documentation/COMPATIBILITY.md">Package Compatibility</a>, and <a href="https://github.com/msavin/Mongol/blob/master/documentation/CHANGELOG.md">Changelog</a>
 - Licensed under <a href="https://github.com/msavin/Mongol/blob/master/documentation/LICENSE.md">The MIT License</a>
 - Designed to work with <a href="https://github.com/msavin/JetSetter">JetSetter</a>, the Mongol equivalent for Sessions
 - Part of the <a href="http://meteor.toys">Meteor Toys</a> Bundle
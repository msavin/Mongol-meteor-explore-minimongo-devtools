Meet Mongol, the Original Development Tool for Meteor
=====================================================

Starting today, you'll never have to enter the console to play with your collections again. With Mongol, you can view and edit your client documents right in the browser. And because Mongol is a debugOnly package, it does not compile to your production build.

<a href="http://meteor.toys"><img src="https://raw.githubusercontent.com/msavin/Mongol-meteor-explore-minimongo-devtools/master/Mongol.gif" width="1024" height="640"></a>

Plug & Play Installation
------------------------

Mongol configures automatically. To get started, run:

	meteor add msavin:mongol

After installation, open your app in the browser and press Control + M to toggle it. 

Note: the new Mongol requires Meteor 1.8

How Does It Work?
-----------------
Using Mongol is like having a database management tool with-in your Meteor application. Meteor publishes data to `minimongo`, and Mongol hooks into it to show you all the documents on the client. With that, you can: 
 - View the document counts in your `minimongo` collection
 - Browse the documents in your `minimongo` collection
 - Modify any document as if you have insecure on
 - Get a reactive window into your data

FAQ 
---
<strong>Does Mongol require insecure to work?</strong> No, Mongol has special set of method's that allow it to interact with the database without disrupting your application permissions.

<strong>Is there a security risk to using Mongol?</strong> Since Mongol is a `debugOnly` package, Meteor's build process will not compile it into production code.

<strong>Will Mongol cause my application to behave differently?</strong> All of the code and functions of Mongol are pre-fixed and scoped, so there shouldn't be any intrusion.

About
-----

<center>Mongol is part of <a href="http://meteor.toys">Meteor Toys</a>, 
	and is licensed under the <a href="https://github.com/MeteorToys/allthings/blob/master/LICENSE.md">Meteor Toys License</a>.
(C) Toys, Inc 2019. All Rights Reserved.</center>
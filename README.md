Meet Mongol, the Original Development Tool for Meteor
=====================================================

Starting today, you'll never have to enter the console to play with your Meteor collections again. With Mongol, you can view and edit any client document right in the browser. And because Mongol is a debugOnly package, it does not compile to your production build.

<a href="http://meteor.toys"><img src="https://raw.githubusercontent.com/msavin/Mongol/master/Mongol.gif"></a>

Plug & Play Installation
------------------------

Mongol works automatically. To install it, run:

	$ meteor add msavin:mongol

After installation, open your app in the browser and press Control + M to toggle it.

How Does It Work?
-----------------

Using Mongol is like having a database management tool with-in your Meteor application. Since Mongol acts on `minimongo`, it automatically displays all the documents on your client. With that, you can: 
 - View the document counts in your `minimongo` collection
 - Browse the documents in your `minimongo` collection
 - Modify any document as if you have insecure on
 
In Other News: Search and Impersonate Accounts
------------------------------------

Combine Mongol with the free <a href="http://github.com/msavin/MeteorCandy">Meteor Candy Light</a> package to search and impersonate any account. It's just like signing into an account. You will see the account details with in the Account tab in Mongol, and your pub/sub data should update automatically. 

FAQ 
---
<strong>Does Mongol require insecure to work?</strong> No, Mongol has special set of Methods that allow it to interact with the database without disrupting your application permissions. Check them out in `./server`.

<strong>Is there a security risk to using Mongol?</strong> Since Mongol is marked as a `debugOnly` package, Meteor's build tool will automatically remove it when you build your app for production.

<strong>Can I use Mongol in production?</strong> Since Mongol is a `debugOnly` package, it will only work in development mode. For production, I have another solution called <a href="https://www.meteorcandy.com">Meteor Candy</a>.

<strong>Will Mongol cause my application to behave differently?</strong> All of the code and functions of Mongol are pre-fixed and scoped, so there shouldn't be any intrusion.

<strong>Can I add or remove collections that are displayed in Mongol?</strong> To add a collection to the list, use `Package[“msavin:mongol”].Mongol.showCollection(‘collectionName’)`, and to remove, use `Package[“msavin:mongol”].Mongol.hideCollection(‘collectionName’)`. These functions work on the client. 

<strong>Can I toggle Mongol without the hotkeys?</strong> Yes, there is a `meteortoys:toggle` package that provides a visual button for it. Mongol will also shrink or close if you right click on it.

<strong>This is great! I want more!</strong> I'm glad you said that. Check out the premium Meteor Toys packages on the <a href="http://meteor.toys">official website</a> for over a dozen other tools like Mongol.

If you experience any issues, check out COMPATIBILITY.md and/or get in touch.

About
-----

<center>Mongol is part of <a href="http://meteor.toys">Meteor Toys</a>, 
	and is licensed under the <a href="https://github.com/MeteorToys/allthings/blob/master/LICENSE.md">Meteor Toys License</a>.
&copy; FaverSocial, LLC 2014. All Rights Reserved.</center>

Mongol Compatibility 
====================

Mongol works with most applications out of the box. It comes with built-in support for packages such as `aldeed:simple-schema` and `aldeed:collection2`. 

However, there are few cases where Mongol could conflict with other packages.In those cases, go to /.meteor/packages and move Mongol towards the top of the list. If you're still having issues, please submit an issue to GitHub.

In the event that you do not wish to use automatic collection detections, you can specify the collection names manually:

	// be sure to use collection names, not variables
	// Collection = new Mongo.Collection('collection-name')

	Package["meteortoys:toykit].MeteorToysDict.set("Mongol", {
		collections: ["lists", "todos"]
	})

For applications that use ES6 modules, Mongol will require you to export the collection as a global variable. You can wrap the export into a debugOnly package so that it does not get pushed to production.
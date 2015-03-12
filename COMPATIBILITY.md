Mongol Compatibility 
====================

Mongol works with most applications out of the box. It comes with built-in support for packages such as `aldeed:simple-schema` and `aldeed:collection2`. However, there are few cases where Mongol could conflict with other packages.

In those cases, go to /.meteor/packages and move Mongol towards the top of the list. If you're still having issues (related to this or not), please submit an issue to GitHub (and feel free to do a PR).

In the event that you do not wish to use automatic collection detections, you can specify the collection names manually:

	// be sure to use collection names, not variables
	// Collection = new Mongo.Collection('collection-name')

	Session.set("Mongol", {
		collections: ["lists", "todos"]
	})
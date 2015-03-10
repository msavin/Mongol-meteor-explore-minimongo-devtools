// Testing with both Mongo and Meteor to ensure compatibility 
Vendor        = new Mongo.Collection('vendor');
Product       = new Mongo.Collection('product');
Cart		  = new Meteor.Collection('cart');
Orders		  = new Meteor.Collection('orders');
LongName      = new Meteor.Collection('Super_Big_Collection');

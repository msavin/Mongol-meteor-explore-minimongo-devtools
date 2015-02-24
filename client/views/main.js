
Meteor.subscribe("data", "20")

Session.set("Mongol", {
	'collections': ['Vendor', 'Product', 'Cart', 'Orders'],
	'display': false,
	'opacity_normal': ".7",
	'opacity_expand': ".9",
})

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingItemSchema = new Schema({
	user_name: {
		type: String,
		required: true,
	},
	item: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("ShoppingItem", shoppingItemSchema);
// check controllers for shopping items.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String, requried: true },
		age: { type: Number },
		description: { type: String },
		image: { type: String },
		price: { type: Number, requried: true, min: 1 },
		quantity: { type: Number, requried: true, min: 1 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;

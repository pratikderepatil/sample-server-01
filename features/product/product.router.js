const express = require("express");
const Product = require("./product.model");

const app = express.Router();

app.get("/", async (req, res) => {
	const { limit = 10, page = 1 } = req.query;
	try {
		let products = await Product.find()
			.limit(limit)
			.skip((page - 1) * limit);
		res.send(products);
	} catch (err) {
		res.status(404).send("err.message");
	}
});

module.exports = app;

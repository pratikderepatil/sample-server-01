const express = require("express");
const User = require("../user/user.model");
const Product = require("../product/product.model");
const Cart = require("./cart.model");

const app = express.Router();

const authMiddleware = async (req, res, next) => {
	let token = req.headers.token;
	if (!token) {
		res.status(404).send("Missing token");
	}
	let [email, password] = token.split("_#_");
	try {
		let user = await User.findOne({ email });
		if (user) {
			if (password === user.password) {
				req.userId = user.id;
				next();
			} else {
				res.status(404).send("Authentication failed, incorrect password");
			}
		} else {
			res.status(404).send(`User with: ${email} not found`);
		}
	} catch (err) {
		res.status(404).send(err.message);
	}
};

app.use(authMiddleware);

app.get("/", async (req, res) => {
	try {
		let carts = await Cart.find({ user: req.userId }).populate([
			{ path: "user", select: ["name", "age", "email"] },
			"product",
		]);
		res.send(carts);
	} catch (err) {
		res.status(404).send("err.message");
	}
});

app.post("/", async (req, res) => {
	try {
		let product = await Product.findById(req.body.product);
		if (product.quantity > req.body.quantity) {
			let carts = await Cart.create({ ...req.body, user: userId });
			res.send(carts);
			await Product.findByIdAndUpdate(product.id, {
				quantity: product.quantity - carts.quantity,
			});
		}
	} catch (err) {
		res.status(404).send("err.message");
	}
});
module.exports = app;

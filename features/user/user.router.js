const express = require("express");
const User = require("./user.model");

const app = express.Router();

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			if (password === user.password) {
				res.send({
					token: `${email}_#_${password}`,
					user, 
				});
			} else {
				res.status(404).send("Authentication failed, incorrect password");
			}
		} else {
			res.status(404).send(`User with: ${email} not found`);
		}
	} catch (err) {
		res.status(404).send(err.message);
	}
});

app.post("/signup", async (req, res) => {
	const { email, password, name, age } = req.body;
	try {
		let existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(404).send("User already exists");
		} else {
			let user = await User.create({
				email,
				password,
				name,
				age,
			});
			res.send({
				token: `${user.email}_#_${user.password}`,
			});
		}
	} catch (e) {
		console.log(e.message);
	}
});

module.exports = app;

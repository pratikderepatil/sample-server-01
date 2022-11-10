const express = require("express");
const cors = require("cors");
const userRoute = require("./features/user/user.router");
const productRoute = require("./features/product/product.router");
const homeRoute = require("./features/home/home.router");
const cartRoute = require("./features/cart/cart.router");
const connect = require("./config/db");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/home", homeRoute);
app.use("/carts", cartRoute);

app.listen(PORT, async () => {
	await connect();
	console.log(`Listening at http://localhost:${PORT}`);
});

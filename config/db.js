const mongoose = require("mongoose");
let client;
const connect = async () => {
	client = await mongoose.connect(process.env.MONGODB_URI);
	return client;
};

module.exports = connect;

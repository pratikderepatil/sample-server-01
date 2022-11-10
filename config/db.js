const mongoose = require("mongoose");

const connect = async () => {
	return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connect;

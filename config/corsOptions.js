// CORS need to be set, because not all public domain could enter our domain.
const allowedOrigins = require("./allowedOrigins");
const corsOprtions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) != -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"), true);
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOprtions;

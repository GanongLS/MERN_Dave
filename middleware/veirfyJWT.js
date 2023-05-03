const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({
			error: true,
			message: "Not authorized.",
		});
	}
	// console.log({ authHeader }); // Bearer token
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		if (error) {
			return res.status(403).json({
				error: true,
				message: `Access forbidden, ${error.message}.`,
			});
		}
		req.user = decoded.userInfo.username;
		req.roles = decoded.userInfo.roles;
		// console.log({ "req.user": decoded.username });
		next();
	});
};

module.exports = { verifyJWT };

const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.status(401).json({
			error: true,
			message: "Tidak ada cookies",
		});
	} // unathourized

	console.log({ cookiesJWT: cookies.jwt });
	const refreshToken = cookies.jwt;
	// check for user
	try {
		const foundUser = await User.findOne({ refreshToken }).exec();
		if (!foundUser) {
			return res.status(403).json({
				error: true,
				message: `Forbidden, silakan login terlebih dahulu.`,
			});
		} // forbidden
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
			if (error || foundUser.username !== decoded.username) {
				return res.status(403).json({
					error: true,
					message: `Access forbiden, ${error.message}.`,
				});
			}
			// finding roles
			const roles = Object.values(foundUser.roles).filter(v => v);
			// giving new access token
			const accessToken = jwt.sign(
				{
					userInfo: {
						username: decoded.username,
						roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "10s",
				}
			);
			res.status(200).json({ roles, accessToken });
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { handleRefreshToken };

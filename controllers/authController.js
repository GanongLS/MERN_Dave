const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			"message": "Username and password are required.",
		});
	}

	// check for user
	try {
		const foundUser = await User.findOne({ username }).exec();
		if (!foundUser) {
			return res.status(401).json({
				"error": true,
				"message": `user ${username} tidak ditemukan`,
			});
		} // unathourized
		const passwordMatch = await bcrypt.compare(password, foundUser.password);
		if (passwordMatch) {
			// finding roles
			const roles = Object.values(foundUser.roles);
			// create JWT (JSON Web Token)
			const accessToken = jwt.sign(
				{
					userInfo: {
						"username": foundUser.username,
						roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "10m",
				}
			);
			const refreshToken = jwt.sign(
				{
					"username": foundUser.username,
				},
				process.env.REFRESH_TOKEN_SECRET,
				{
					expiresIn: "1d",
				}
			);
			// Saving refreshToken with current user to the DB
			foundUser.refreshToken = refreshToken;
			await foundUser.save();
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				sameSite: "none",
				// secure: true, // di take out dulu, karena ga bisa jalan di thunder client.
				maxAge: 24 * 60 * 60 * 1000,
			});
			return res.status(200).json({
				error: false,
				message: `user ${username} berhasil login.`,
				accessToken,
			});
		} else {
			return res.status(401).json({
				"error": true,
				"message": `wrong password`,
			});
		}
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

module.exports = { handleLogin };

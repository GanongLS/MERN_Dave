const User = require("../model/User");

const handleLogout = async (req, res) => {
	// on Client, should delete the accessToken.

	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(204);
	} // no content

	const refreshToken = cookies.jwt;
	// check is refresh token in DB
	try {
		const foundUser = await User.findOne({ refreshToken }).exec();
		if (!foundUser) {
			res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
			return res.sendStatus(204);
		} // no content
		foundUser.refreshToken = "";
		const savedLogoutUser = await foundUser.save();
		console.log({ savedLogoutUser });
		res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
		res.status(200).json({ error: false, message: `User ${foundUser.username} berhasil logout.` });
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}

	// altenarive
	// try {
	// 	const updatedUser = await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }, { new: true }).exec();
	// 	res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
	// 	res.status(200).json({ error: false, message: `User ${foundUser.username} berhasil logout.` });
	// } catch (error) {
	// 	return res.status(500).json({ "message": error.message });
	// }
};

module.exports = { handleLogout };

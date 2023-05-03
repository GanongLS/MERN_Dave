const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });
	try {
		// check for duplicate username in db
		const duplicate = await User.findOne({ username: username }).exec(); // return any match users.
		if (duplicate) {
			return res
				.status(409)
				.json({ "error": true, "message": `There is already user ${username} registered. Please try login. ` });
		}
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
	// conflict
	try {
		// encrypt the password
		const hashedPassword = await bcrypt.hash(password, 10);
		// create and store the new user at mongoDB
		const result = await User.create({
			username,
			password: hashedPassword,
		});

		console.log({ result });

		return res.status(201).json({ "success": `New user ${username} created.` });
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

module.exports = { handleNewUser };

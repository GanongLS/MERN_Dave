const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.roles) {
			return res.status(401).json({
				error: true,
				message: "Roles are required.",
			});
		}
		const rolesArray = [...allowedRoles];
		const reqRoles = req.roles;
		// console.log({ rolesArray });
		// console.log({ reqRoles });
		const result = reqRoles.map((role) => rolesArray.includes(role)).find((v) => v === true);
		if (!result) return res.status(401).json({ error: true, message: "Not Authorized." });
		next();
	};
};

module.exports = verifyRoles;

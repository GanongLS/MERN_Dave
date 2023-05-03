const express = require("express");
const router = express.Router();
const {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/")
	.get(getAllEmployees)
	.post(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), createNewEmployee)
	.put(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), updateEmployee)
	.delete(verifyRoles(ROLES_LIST.admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;

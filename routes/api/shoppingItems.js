const express = require("express");
const router = express.Router();
const {
	getAllItems,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../controllers/shoppingItemsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/")
	.get(getAllItems)
	.post(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), createNewEmployee)
	.put(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), updateEmployee)
	.delete(verifyRoles(ROLES_LIST.admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;

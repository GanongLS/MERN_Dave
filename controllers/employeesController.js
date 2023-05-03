const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		if (!employees) return res.status(204).json({ "message": "There are no any employee" });

		return res.status(200).json(employees);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const createNewEmployee = async (req, res) => {
	const newEmployee = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};

	if (!newEmployee.firstname || !newEmployee.lastname) {
		return res.status(400).json({ "message": "First and last name are required." });
	}

	try {
		const createdEmployee = await Employee.create(newEmployee);
		res.status(201).json(createdEmployee);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const updateEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ "message": `Employee ID is required.` });
	}
	try {
		const foundEmployee = await Employee.findOne({ _id: req.body.id }).exec();
		if (!foundEmployee) {
			return res.status(404).json({ "message": `Employee ID ${req.body.id} not found.` });
		}
		if (req.body.firstname) foundEmployee.firstname = req.body.firstname;
		if (req.body.lastname) foundEmployee.lastname = req.body.lastname;
		const savedUpdatedEmployee = await foundEmployee.save();
		console.log({ savedUpdatedEmployee });
		res.json(savedUpdatedEmployee);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const deleteEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ "message": `Employee ID is required.` });
	}
	try {
		const foundEmployee = await Employee.findOne({ _id: req.body.id });
		if (!foundEmployee) {
			return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
		}
		const resultDelete = await foundEmployee.deleteOne({ _id: req.body.id });
		console.log({ resultDelete });
		res.json(resultDelete);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const getEmployee = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ "message": `Employee ID is required.` });
	}
	try {
		const foundEmployee = await Employee.findOne({ _id: req.params.id });
		if (!foundEmployee) {
			return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
		}
		res.json(foundEmployee);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee };

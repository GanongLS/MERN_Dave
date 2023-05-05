const ShoppingItem = require("../model/ShoppingItem");

const getAllItems = async (req, res) => {
	try {
		const items = await ShoppingItem.find();
		return res.status(200).json(items);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const createNewItem = async (req, res) => {
	const newItem = {
		item: req.body.item,
	};

	if (!newItem.item) {
		return res.status(400).json({ "message": "item name are required." });
	}

	try {
		const createdItem = await ShoppingItem.create(newItem);
		res.status(201).json(createdItem);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const updateItem = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ "message": `Item ID is required.` });
	}
	try {
		const foundItem = await ShoppingItem.findOne({ _id: req.body.id }).exec();
		if (!foundItem) {
			return res.status(404).json({ "message": `ShoppingItem with ID: ${req.body.id} not found.` });
		}
		if (req.body.item) foundItem.item = req.body.item;
		const savedUpdatedItem = await foundItem.save();
		console.log({ savedUpdatedItem });
		res.json(savedUpdatedItem);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const deleteItem = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ "message": `ShoppingItem ID is required.` });
	}
	try {
		const foundItem = await ShoppingItem.findOne({ _id: req.body.id });
		if (!foundItem) {
			return res.status(400).json({ "message": `ShoppingItem ID ${req.params.id} not found` });
		}
		const resultDelete = await foundItem.deleteOne({ _id: req.body.id });
		console.log({ resultDelete });
		res.json(resultDelete);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

const getItem = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ "message": `ShoppingItem ID is required.` });
	}
	try {
		const foundItem = await ShoppingItem.findOne({ _id: req.params.id });
		if (!foundItem) {
			return res.status(400).json({ "message": `ShoppingItem with ID: ${req.params.id} not found` });
		}
		res.json(foundItem);
	} catch (error) {
		return res.status(500).json({ "message": error.message });
	}
};

module.exports = { getAllItems, createNewItem, updateItem, deleteItem, getItem };

//check routes/api for shopping items
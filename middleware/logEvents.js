const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvent = async (message, fileName) => {
	const dateTime = `${format(new Date(), "yyyy/MM-dd\thh:mm:ss")}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}
		await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), logItem);
	} catch (error) {
		console.error({ error });
	}
};

const logger = (req, res, next) => {
	logEvent(`${req.method}\tfrom: ${req.headers.origin}\trequesting: ${req.url}`, "reqLog.txt");
	// console.log(`logger: ${req.method}\t${req.path}`);
	next();
};

module.exports = { logEvent, logger };

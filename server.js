require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOprtions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const { verifyJWT } = require("./middleware/veirfyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConect");

const PORT = process.env.PORT || 3300;

// connect to DB, if error we don't need to connect to other middleware, server without DB is nothing.
connectDB();


// custom middleware logger
app.use(logger);

// Access-Control-Allow-Credentials
// allowed origin.
app.use(credentials);

// Cross Origin Resource Sharing.

app.use(cors(corsOprtions));

// built in middleware to handle url encoded data.
// in other word form data.
// 'content-type: application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: false }));

// built in middleware for json.
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static file
app.use("/", express.static(path.join(__dirname, "/public")));

// How to use route
app.use("/", require("./routes/root"));

// route for auth API
app.use("/register", require("./routes/api/register"));
app.use("/authenticate", require("./routes/api/authenticate"));
app.use("/refresh", require("./routes/api/refreshToken"));
app.use("/logout", require("./routes/api/logout"));

// route for employee API
// use verifyJWT for all employee API
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

// app.use("/*"); don't accept regex in old version.
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
	else if (req.accepts("json")) res.json({ error: "404 Not Found!" });
	else res.type("txt").send("404 Not Found!");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("connected to mongoDB");
	app.listen(PORT, () => {
		console.log(`server running on PORT: ${PORT}`);
	});
});

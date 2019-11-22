const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const cors = require("cors");
const routes = require("./routes/index");
const helpers = require("./helpers");

// create app
const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    useNewUrlParser: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// // Passport JS for logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// Cors
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Handle our own routes!
app.use("/", routes);

// done! we export it so we can start the site in start.js
module.exports = app;

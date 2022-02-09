// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "express-movies";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const celebrities = require('./routes/celebrities');
app.use("/", celebrities);

const movies= require('./routes/movies');
app.use("/movies", movies)


// custom helper function for the movies edit view
hbs.registerHelper('selector', function (movie) {
    // const selected = movie.cast.map(actor => actor._id).includes(this._id) ? 'selected' : '';
    let selected = '';
    // "this" is one of the celebrities we are looping over in the edit.hbs view
    if (movie.cast.map(actor => actor._id).includes(this._id)) {
      selected = 'selected';
    }
    return '<option value="' + this._id + '" ' + selected + '>' + this.name + '</option>';
  });

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

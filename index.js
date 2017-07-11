// Require all modules to get the app running:

var express = require('express');
var app = express();
var compression = require('compression');
var swig = require('swig-templates');
var package = require('./package.json');
var config = require('./config');



// Configure general app settings and functionality:

app.use(compression());
app.use(express.static(`${__dirname}/public`));



// Configure app to use Swig as default template/render engine:

swig.setDefaults({
  loader: swig.loaders.fs(`${__dirname}/views`)
});
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', `${__dirname}/views`);



// Setting global variables that are always accessible inside of views:

app.locals = {
  package: package
};



// Set up the frontend app to handle all routing:

app.get('*', function (req, res) {
  res.render('pages/index');
});



// Set up error handling and debug logging:

app.use(function(error, req, res, next) {
  console.dir(error);
  next();
});



// Run the app:

app.listen(config.port);



// Export the app:

module.exports = app;

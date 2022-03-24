/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
var createError = require('http-errors');
require('dotenv').config();

const bookRouter = require('./routes/bookRouter');

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.json());
 app.use('/mpa', bookRouter);
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'pug');
 
/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
  //return response.send('OK');
  res.redirect('/mpa/books');
});

  // error page
app.use(function(err, req, res, next){
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

/**
 * Server Activation
 */
 let port = process.env.PORT || 3000;
 app.listen(port, () => {
   console.log(`App is listening on port ${port}`);
 });

# Part 1: Creating a Skeleton

[Express Tutorial: The Local Library website](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)

```
mkdir mpa
cd mpa
npm init -y
```

```
npm install express pug body-parser
```

Create a `.gitignore` file containing

```
node_modules
```

Create the project directory structure

```
mkdir src
mkdir src/views
mkdir src/public
mkdir src/models
mkdir src/routes
mkdir src/controllers
```

Create src directory and create file, server.js, with content:
```js
const express = require('express');
const app = express();

app.get('/', (request, response) => {
  return response.send('OK');
});

app.listen(5000, () => {
  console.log('App is listening on port 5000');
});
```

Edit package.json, replacing "scripts" object with
```
  "scripts": {
    "start": "nodejs src/server.js"
  },
```

Start the application with

```
npm start
```

## Adding static files

Node's path module provides utilities for working with file and directory paths. It can be accessed using:

```js
const path = require('path');
```

We will use the `express.static` built-in middleware function to serve static files such as images, CSS files, and JavaScript files, 

```js
app.use(express.static(path.join(__dirname, 'public')));
```
The argument to `express.static()` specifies the directory from which to serve static assets. In our case, the `public` directory under our current directtory.


## Adding body-parser

```js
const bodyParser = require('body-parser');
```

```js
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
```

## Catching errors

`
npm install http-errors
`

`
var createError = require('http-errors');
`

404 not found

```js
// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});
```

`404.pug`

```
extends layout

block content
  h1 404: Not Found
  p Sorry we can't find #{url}
```

## Adding routes
`bookRouter.js`

```js
const express = require('express');
var router = express.Router();

const book_controller = require('../controllers/bookController'); 

// GET request for creating a Book.
router.get('/book/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/book/create', book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/delete/:id', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/delete', book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/update/:id', book_controller.book_update_get);

// POST request to update Book.
router.post('/book/update', book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book.
router.get('/books', book_controller.book_list);

module.exports = router;
```


## Adding the controller

`bookController.js`

```js
var Book = require('../models/bookModel');

// Display list of all books.
exports.book_list = function(req, res, next) {
    const books = Book.findAll();
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
  const book = {'id': uuidv4(), 'title': '', 'author': '', 'year': ''};
};

// Handle book create form submission.
exports.book_create_post = function(req, res, next) {
  const book = req.body;
  Book.insertOne(book);
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res, next) {
  const book = req.body;
  Book.deleteOne(book.id);
};

// Display book update form on GET.
exports.book_update_get = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
};

// Handle book update on form submission.
exports.book_update_post = function(req, res, next) {
  const book = req.body;
  Book.updateOne(book);
};
```

## Adding the model

```js
const { v4: uuidv4 } = require('uuid');
uuidv4();
```

```js
exports.findAll = function() {}

exports.findOne = function(id) {}

exports.insertOne = function(book) {}

exports.updateOne = function(book) {}

exports.deleteOne = function(id) {}
```

## Adding the view

```js
const pug = require('pug');
```

```js
app.set('views', './views');
app.set('view engine', 'pug');
```

Create stubs

`layout.pug`

```
html
  head
    meta(charset="utf-8")
    meta(name='viewport' content='width=device-width')
    title= 'Books'
  body
    block content
```

`booklist.pug`

```
extends layout

block content
  h1 Book List
```

`bookdetail.pug`

```
extends layout

block content
  h1 Book Detail
```

`bookform.pug`

```
extends layout

block content
  h1 Book Form
```

`bookdelete.pug`

```
extends layout

block content
  h1 Book Delete
```

## Testing 
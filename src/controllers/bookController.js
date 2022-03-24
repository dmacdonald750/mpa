const { v4: uuidv4 } = require('uuid');
var Book = require('../models/bookModel');

// Display list of all books.
exports.book_list = function(req, res, next) {
  const books = Book.findAll();
  res.render('booklist.pug', {'books': books});
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
  res.render('bookdetail.pug', {'book': book});
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
  const book = {'id': uuidv4(), 'title': '', 'author': '', 'year': ''};
  res.render('bookform.pug', {'action': '/mpa/book/create', 'book': book});
};

// Handle book create form submission.
exports.book_create_post = function(req, res, next) {
  const book = req.body;
  Book.insertOne(book);
  res.redirect('/mpa/books');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
  res.render('bookdelete.pug', {'book': book});
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res, next) {
  const book = req.body;
  Book.deleteOne(book.id);
  res.redirect('/mpa/books');
};

// Display book update form on GET.
exports.book_update_get = function(req, res, next) {
  const id = req.params.id;
  const book = Book.findOne(id);
  res.render('bookform.pug', {'action': '/mpa/book/update', 'book': book});
};

// Handle book update on form submission.
exports.book_update_post = function(req, res, next) {
  const book = req.body;
  Book.updateOne(book);
  res.redirect('/mpa/books');
};
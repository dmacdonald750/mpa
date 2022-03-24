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
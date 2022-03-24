const path = require('path');
const fs = require('fs');

let books = readDB();

function readDB() {
  const filename = process.env.DB || 'docs.json';
  const datafile = path.join(__dirname, filename);
  try {
    const data = fs.readFileSync(datafile, "utf8");
    docs = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
  return docs;
}

function writeDB() {
  const filename = process.env.DB || 'docs.json';
  const datafile = path.join(__dirname, filename);
  let data = JSON.stringify(books, null, 2);
  try {
    fs.writeFileSync(datafile, data)
  } catch (err) {
    console.error(err)
  }
}

function filterValue(obj, key, value) {
  return obj.find(function(v){ return v[key] === value});
}

function filterIndex(obj, key, value) {
  return obj.findIndex(function(v){ return v[key] === value});
}

exports.findAll = function() {
  return books;
};

exports.findOne = function(id) {
  const book = filterValue(books,"id",id);
  return book;
};

exports.insertOne = function(book) {
  books.push(book);
  writeDB();
};

exports.updateOne = function(book) {
  const idx = filterIndex(books,"id",book.id);
  books[idx] = book;
  writeDB();
};

exports.deleteOne = function(id) {
  const idx = filterIndex(books,"id",id);
  books.splice(idx, 1);
  writeDB();
};
const Book = require("../models/Book");

/**
 * @param {Book} book
 */
function saveBook(res, book) {
  if (!book) {
    console.log("Book cannot be undefined or null");
    throw new Error("Unable to save book - Book Undefined | Null");
  }

  const { name, category, author, description } = book;
  console.log("Book is", book);
  // No required fields
  if (!name || !category || !author || !description) {
    throw new Error("Unable to save book - Undefined / Null Fields");
  }

  Book.save(res, book);
}

function updateBook(res, id, doc) {
  Book.update(res, id, doc);
}

function getBookById(res, id) {
  Book.getBookById(res, id);
}

function searchBooks(res, params) {
  console.log(params);

  const { name, author, category, page, size } = params;
  const query = {};
  query["$and"] = [];

  if (name) {
    query["$and"] = [...query["$and"], { name: new RegExp(name) }];
  }

  if (author) {
    query["$and"] = [...query["$and"], { author: new RegExp(author) }];
  }

  if (category) {
    query["$and"] = [...query["$and"], { category: category }];
  }

  Book.search(res, query, page, size);
}

module.exports = {
  save: saveBook,
  update: updateBook,
  getById: getBookById,
  searchBooks: searchBooks
};

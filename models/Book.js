const DB = require("nedb");
const store = new DB({ filename: "db/books.db", autoload: true });

/**
 * @typedef {Object} Book
 * @property {string} name - Book Name
 * @property {string} category - Book category
 * @property {string} author - Book author
 * @property {string} description - Book description
 * @property {number} createdAt - Time of creation for book listing
 * @property {number} updatedAt - Time of creation for book listing
 *
 */

/**
 * @description
 * Save a book
 *
 * @param {Book} book
 */
function save(res, book) {
  // set timestamp
  const timestamp = new Date().getTime();

  store.insert(
    {
      ...book,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        throw new Error("Unable to save book - db error");
      }

      return res.json(doc);
    }
  );
}

/**
 * Update the book
 * @param {Book} book
 */
function update(res, id, book) {
  store.update(
    { _id: id },
    {
      $set: {
        ...book,
        updatedAt: new Date().getTime()
      }
    },
    {
      upsert: false
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        throw new Error("Unable to update db - Update database");
      }

      return res.json(doc);
    }
  );
}

function remove(res, id) {
  store.remove({ _id: id }, {}, function(params) {});
}

function getBookById(res, id) {
  store.findOne({ _id: id }).exec((err, doc) => res.json(doc));
}

function searchBooksByParams(res, query = {}, page = 1, size = 20) {
  console.log("Query recevied ", query);

  store
    .find(query)
    .limit(size)
    .skip(page - 1)
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(doc);
      res.json(doc);
    });
}

module.exports = {
  save: save,
  update: update,
  getBookById: getBookById,
  search: searchBooksByParams
};

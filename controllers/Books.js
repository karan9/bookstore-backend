const bookService = require("../services/BooksService");
const router = require("express").Router();

/**
 * @description
 * Get all books
 */
router.get("/", (req, res) => {
  bookService.searchBooks(res, req.query);
});

/**
 * @description
 * Get book by id
 */
router.get("/:id", (req, res) => {
  bookService.getById(res, req.params.id);
});

/**
 * @description
 * Insert a book
 */
router.post("/", (req, res) => {
  try {
    bookService.save(res, req.body);
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      message: error.message
    });
  }
});

/**
 * @description
 * Update a book
 */
router.put("/:id", (req, res) => {
  try {
    bookService.update(res, req.params.id, req.body);
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      message: error.message
    });
  }
});

/**
 * @description
 * Update a book
 */
router.delete("/:id", (req, res) => {
  res.json({
    messgae: "Insert single book"
  });
});

module.exports = router;

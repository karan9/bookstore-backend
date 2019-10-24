const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/Books");

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * CORS
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

/**
 * Setup our middlewares
 */
// parse application/json
app.use(bodyParser.json());

/**
 * endpoints
 */
app.use("/books", booksController);

/**
 * Start listening on specified Port
 */
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

// schema defination
// const user = {
//   fName: "Karan",
//   lName: "Srivastava",
//   mob: "9910661879",
//   createdAt: new Date().getTime()
// };

// usersdb.insert(user, function(err, doc) {
//   console.log("User Inserted", user);
//   usersdb.find({ fName: "Karan" }, function(err, doc) {
//     console.log("Document Found", doc);
//   });
// });

const express = require("express");
const connection = require("./models/database");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const usersRoute = require("./routes/users-routes");
const displaysRoute = require("./routes/displays-routes");
const documentsRoute = require("./routes/documents-routes");

const app = new express();
app.use(bodyParser.json());

/* Routes */
app.use("/api/users", usersRoute);
app.use("/api/displays", displaysRoute);
app.use("/api/documents", documentsRoute);

app.use(express.static("./public"));

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

try {
  connection.connect();
  app.listen(5000);
} catch (err) {
  console.log(err);
}

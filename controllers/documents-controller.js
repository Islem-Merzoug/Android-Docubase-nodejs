const connection = require("../models/database");
const multer = require("multer");
const path = require("path");

/* Read */
const getDocuments = (req, res, next) => {
  connection.query(`SELECT * FROM documents`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ documents: results });
  });
};

const getDocumentById = (req, res, next) => {
  const documentId = req.params.id;
  connection.query(
    `SELECT * FROM documents WHERE id = ${documentId}`,
    function (error, results, fields) {
      if (error) throw error;
      res.json({ document: results[0] });
    }
  );
};

/* Update */
const updateDocument = (req, res, next) => {
  const documentId = req.params.id;
  connection.query(
    `UPDATE documents SET title = "${req.body.title}" WHERE id = ${documentId}`,
    function (error, results, fields) {
      if (error) throw error;
      res.json({ message: "Document updated with succes." });
    }
  );
};

/* Delete */
const deleteDocument = (req, res, next) => {
  const documentId = req.params.id;
  connection.query(`DELETE FROM documents WHERE id = ${documentId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ message: "Document deleted with succes." });
  });
};

/* Upload */
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".").slice(0, -1).join(".") +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
}).single("myDocument");

const uploadDocument = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) console.log(error);
    if (req.body.title && req.body.publisher) {
      connection.query(
        `INSERT INTO documents (title, name, extension, published_date, publisher) VALUES("${
          req.body.title
        }", "${req.file.filename
          .split(".")
          .slice(0, -1)
          .join(".")}", "${path.extname(req.file.originalname)}", NOW(), ${
          req.body.publisher
        })`,
        function (error, results, fields) {
          if (error) throw error;
          res.json({ message: "File Uploaded with succes." });
        }
      );
    } else {
      res.json({ message: "Document not ready to upload, please try again." });
    }
  });
};

/* Download */
const downloadDocument = (req, res, next) => {
  const documentId = req.params.id;
  connection.query(
    `SELECT * FROM documents WHERE id = ${documentId}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results[0]) {
        const documentPath = path.dirname(require.main.filename) + "/public/uploads/" + results[0].name + results[0].extension;
        console.log(documentPath);
        res.download(documentPath);
      }
    }
  );
};

exports.getDocuments = getDocuments;
exports.getDocumentById = getDocumentById;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;

exports.upload = uploadDocument;
exports.download = downloadDocument;

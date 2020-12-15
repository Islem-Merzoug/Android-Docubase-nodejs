const connection = require("../models/database");

/* Get Displays */
const getDisplays = async (req, res, next) => {
  connection.query(`SELECT * FROM displays`, function (error, results, fields) {
    if (error) throw error;
    res.json({ displays: results });
  });
};

const getSpecificDisplay = async (req, res, next) => {
  const displayId = req.params.id;
  connection.query(`SELECT * FROM displays WHERE id = ${displayId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ display: results[0] });
  });
};

/* Add - Create */
const addDisplay = async (req, res, next) => {
  if (req.body.publisher) {
    connection.query(
      `SELECT * FROM users WHERE id = ${req.body.publisher}`,
      function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
          return res.json({
            message: "The user who want to add this display, dosn't exist.",
          });
        }
      }
    );
  } else {
    return res.json({ message: "Publisher Id required." });
  }

  let display = {};
  display.title = req.body.title;
  display.description = req.body.description;
  display.publisher_id = req.body.publisher;
  connection.query(
    `INSERT INTO displays (title, description, published_date, publisher_id) VALUES("${display.title}", "${display.description}", NOW(), ${display.publisher_id}) `,
    function (error, results, fields) {
      if (error) throw error;
      res.json({ message: "Display added with succes.", display });
    }
  );
};

/* Update */
const updateDisplay = async (req, res, next) => {
  const displayId = req.params.id;
  connection.query(`SELECT * FROM displays WHERE id = ${displayId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    if (results[0]) {
      letUpdateDisplay(results[0]);
    } else {
      return res.json({
        message: "The user who want to add this display, dosn't exist.",
      });
    }
  });

  const letUpdateDisplay = (value) => {
    let display = value;
    if (req.body.title) display.title = req.body.title;
    if (req.body.description) display.description = req.body.description;
    connection.query(
      `UPDATE displays SET title = "${display.title}", description = "${display.description}" WHERE id = ${displayId}`,
      function (error, results) {
        if (error) throw error;
        res.json({ message: "Display updated with succes.", display });
      }
    );
  };
};

/* Delete */
const deleteDisplay = async (req, res, next) => {
  const displayId = req.params.id;
  connection.query(`DELETE FROM displays WHERE id = ${displayId}`, function (error) {
    if (error) throw error;
    res.json({ message: "Display deleted with succes." });
  });
};

exports.getDisplays = getDisplays;
exports.getSpecificDisplay = getSpecificDisplay;

exports.addDisplay = addDisplay;

exports.updateDisplay = updateDisplay;

exports.deleteDisplay = deleteDisplay;

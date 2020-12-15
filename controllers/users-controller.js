const connection = require("../models/database");
const HttpError = require("../models/http-error");

/* Get users */
const getUsers = async (req, res, next) => {
  connection.query("SELECT * FROM users", function (error, results, fields) {
    if (error) throw error;
    res.json({ users: results });
  });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`SELECT * FROM users WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ user: results[0] });
  });
};

const getUsersStudents = async (req, res, next) => {
  connection.query("SELECT * FROM users WHERE role = 'etudiant' ", function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ users: results });
  });
};

const getUsersTeachers = async (req, res, next) => {
  connection.query("SELECT * FROM users WHERE role = 'enseignant' ", function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ users: results });
  });
};

const getUsersAdmins = async (req, res, next) => {
  connection.query(
    "SELECT * FROM users WHERE role = 'administrateur' ",
    function (error, results, fields) {
      if (error) throw error;
      res.json({ users: results });
    }
  );
};

const getStudent = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`SELECT * FROM etudiants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ student: results[0] });
  });
};

const getTeacher = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`SELECT * FROM enseignants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ teacher: results[0] });
  });
};

/* Add users */
const addUser = async (req, res, next) => {
  let user = {};
  user.id = req.body.id;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  connection.query(
    `INSERT INTO users (id, firstname, lastname, email, password, role) VALUES(${user.id}, "${user.firstname}", "${user.lastname}", "${user.email}", "${user.password}", "${user.role}") `,
    function (error, results, fields) {
      if (error) throw error;
      res.json({ message: "User added with succes.", user });
    }
  );
};

const addUserEtudiant = async (req, res, next) => {
  let userEtudiant = {};
  userEtudiant.id = req.body.id;
  userEtudiant.specialty = req.body.specialty;
  userEtudiant.group = req.body.group;
  connection.query(
    `SELECT * FROM users WHERE id = ${userEtudiant.id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results[0]) {
        connection.query(
          `INSERT INTO etudiants (id, specialty, etudiant_group) VALUES(${userEtudiant.id}, "${userEtudiant.specialty}", "${userEtudiant.group}")`,
          function (errorAdd, resultsAdd, fieldsAdd) {
            if (errorAdd) throw errorAdd;
            res.json({
              message: "Student added with succes.",
              student: userEtudiant,
            });
          }
        );
      } else res.json({ message: "This student do not exist in users." });
    }
  );
};

const addUserEnseignant = async (req, res, next) => {
  let userEnseignant = {};
  userEnseignant.id = req.body.id;
  userEnseignant.grade = req.body.grade;
  connection.query(
    `SELECT * FROM users WHERE id = ${userEnseignant.id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results[0]) {
        connection.query(
          `INSERT INTO enseignants (id, grade) VALUES(${userEnseignant.id}, "${userEnseignant.grade}")`,
          function (errorAdd, resultsAdd, fieldsAdd) {
            if (errorAdd) throw errorAdd;
            res.json({
              message: "Teacher added with succes.",
              teacher: userEnseignant,
            });
          }
        );
      } else res.json({ message: "This teacher do not exist in users." });
    }
  );
};

const addUserAdmin = async (req, res, next) => {
  let userAdmin = {};
  userAdmin.id = req.body.id;
  connection.query(`SELECT * FROM users WHERE id = ${userAdmin.id}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    if (results[0]) {
      connection.query(
        `INSERT INTO enseignants (id, grade) VALUES(${userAdmin.id})`,
        function (errorAdd, resultsAdd, fieldsAdd) {
          if (errorAdd) throw errorAdd;
          res.json({
            message: "Admin added with succes.",
            admin: userAdmin,
          });
        }
      );
    } else res.json({ message: "This admin do not exist in users." });
  });
};

/* Update users */
const updateUser = async (req, res, next) => {
  let user;
  const userId = req.params.id;
  connection.query(`SELECT * FROM users WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    setUser(results[0]);
  });
  const setUser = (value) => {
    user = value;
    if (req.body.firstname) {
      user.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      user.lastname = req.body.lastname;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.role) {
      user.role = req.body.role;
    }

    connection.query(
      `UPDATE users SET firstname = "${user.firstname}", lastname = "${user.lastname}", email = "${user.email}", password = "${user.password}", role = "${user.role}" WHERE id = ${userId}`,
      function (error, results, fields) {
        if (error) throw error;
        res.json({ message: "User updated with succes.", user });
      }
    );
  };
};

const updateUserEtudiant = async (req, res, next) => {
  let user;
  const userId = req.params.id;
  connection.query(`SELECT * FROM etudiants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    setUser(results[0]);
  });
  const setUser = (value) => {
    user = value;
    if (req.body.specialty) {
      user.specialty = req.body.specialty;
    }
    if (req.body.group) {
      user.group = req.body.group;
    }
    connection.query(
      `UPDATE etudiants SET specialty = "${user.specialty}", etudiant_group = "${user.group}" WHERE id = ${userId}`,
      function (error, results, fields) {
        if (error) throw error;
        res.json({ message: "Student updated with succes.", user });
      }
    );
  };
};

const updateUserEnseignant = async (req, res, next) => {
  let user;
  const userId = req.params.id;
  connection.query(`SELECT * FROM enseignants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    setUser(results[0]);
  });
  const setUser = (value) => {
    user = value;
    if (req.body.grade) {
      user.grade = req.body.grade;
    }
    connection.query(
      `UPDATE enseignants SET specialty = "${user.grade}", etudiant_group = "${user.group}" WHERE id = ${userId}`,
      function (error, results, fields) {
        if (error) throw error;
        res.json({ message: "Teacher updated with succes.", user });
      }
    );
  };
};

/* Delete users */
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`DELETE FROM users WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ message: "User Deleted with succes." });
  });
};

const deleteUserEtudiant = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`DELETE FROM etudiants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ message: "Student Deleted with succes." });
  });
};

const deleteUserEnseignant = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`DELETE FROM enseignants WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ message: "Teacher Deleted with succes." });
  });
};

const deleteUserAdmin = async (req, res, next) => {
  const userId = req.params.id;
  connection.query(`DELETE FROM admins WHERE id = ${userId}`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json({ message: "Admin Deleted with succes." });
  });
};

/* Login */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  connection.query(`SELECT * FROM users WHERE email = "${email}"`, function (
    error,
    results,
    fields
  ) {
    if (error) new HttpError("Logging in failed, please try again later.", 500);
    if (results[0]) {
      if (email == results[0].email && password == results[0].password) {
        res.json({ message: "logged in!", user: results[0] });
      } else {
        new HttpError("Invalid credentials, could not log you in.", 401);
      }
    } else {
      new HttpError("Invalid credentials, could not log you in.", 401);
    }
  });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUsersStudents = getUsersStudents;
exports.getUsersTeachers = getUsersTeachers;
exports.getUsersAdmins = getUsersAdmins;
exports.getStudent = getStudent;
exports.getTeacher = getTeacher;

exports.addUser = addUser;
exports.addUserEtudiant = addUserEtudiant;
exports.addUserEnseignant = addUserEnseignant;
exports.addUserAdmin = addUserAdmin;

exports.updateUser = updateUser;
exports.updateUserEtudiant = updateUserEtudiant;
exports.updateUserEnseignant = updateUserEnseignant;

exports.deleteUser = deleteUser;
exports.deleteUserEtudiant = deleteUserEtudiant;
exports.deleteUserEnseignant = deleteUserEnseignant;
exports.deleteUserAdmin = deleteUserAdmin;

exports.login = login;

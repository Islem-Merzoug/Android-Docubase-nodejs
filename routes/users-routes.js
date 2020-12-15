const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");

/* Read  */
router.get("/", usersController.getUsers);
router.get("/etudiants", usersController.getUsersStudents);
router.get("/enseignants", usersController.getUsersTeachers);
router.get("/admins", usersController.getUsersAdmins);
router.get("/:id", usersController.getUserById);
router.get("/etudiants/:id", usersController.getStudent);
router.get("/enseignants/:id", usersController.getTeacher);

/* Create */
router.post("/", usersController.addUser);
router.post("/etudiants", usersController.addUserEtudiant);
router.post("/enseignants", usersController.addUserEnseignant);
router.post("/admins", usersController.addUserAdmin);

/* Update */
router.patch("/:id", usersController.updateUser);
router.patch("/etudiants/:id", usersController.updateUserEtudiant);
router.patch("/enseignants/:id", usersController.updateUserEnseignant);

/* Delete */
router.delete("/:id", usersController.deleteUser);
router.delete("/etudiants/:id", usersController.deleteUserEtudiant);
router.delete("/enseignants/:id", usersController.deleteUserEnseignant);
router.delete("/admins/:id", usersController.deleteUserAdmin);

/* login */
router.post("/login", usersController.login);

module.exports = router;

const express = require("express");
const router = express.Router();

const displaysController = require("../controllers/displays-controller");

/* Read */
router.get("/", displaysController.getDisplays);
router.get("/:id", displaysController.getSpecificDisplay);

/* Create */
router.post("/", displaysController.addDisplay);

/* Update */
router.patch("/:id", displaysController.updateDisplay);

/* Delete */
router.delete("/:id", displaysController.deleteDisplay);

module.exports = router;
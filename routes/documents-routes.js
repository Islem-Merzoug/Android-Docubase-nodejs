const express = require("express");
const router = express.Router();

const documentsConroller = require("../controllers/documents-controller");

router.get("/", documentsConroller.getDocuments);
router.get("/:id", documentsConroller.getDocumentById);

router.patch("/:id", documentsConroller.updateDocument);

router.delete("/:id", documentsConroller.deleteDocument);

router.get("/download/:id", documentsConroller.download);
router.post('/upload', documentsConroller.upload);

module.exports = router;
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

const router = express.Router();

// Controllers
const csvController = require("../controllers/csvController");

// Routes
router.get("/", () => console.log("init route"));
router.post(
  "/upload-csv",
  upload.single("file"),
  csvController.convertCsvToJson
);

// Endpoint does not exist
router.use("*", (req, res) => {
  res.status(404).json({
    error: "endpoint does not exist"
  });
});

module.exports = router;

const multer = require("multer");
const csvtojson = require("csvtojson");
const fs = require("fs");

exports.convertCsvToJson = async (req, res) => {
  // Read the CSV file
  const fileRows = [];

  // open uploaded file
  csvtojson()
    .fromFile(req.file.path)
    .on("data", function(data) {
      let jsonStr = data.toString("utf8");
      fileRows.push(JSON.parse(jsonStr)); // push each row
    })
    .on("done", function() {
      fs.unlinkSync(req.file.path); // remove temp file
      res.status(200).json(fileRows);
      //process "fileRows" and respond
    });
};

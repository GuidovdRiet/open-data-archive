const express = require("express");

const router = express.Router();

// Controllers
const neighbourhoodController = require("../controllers/neighbourhoodController");


// Do work here
router.get("/", neighbourhoodController.getAll);
router.get("/neighbourhoods", neighbourhoodController.getAll);
router.get("/neighbourhoods/data", neighbourhoodController.getByData);
router.get("/neighbourhoods/single", neighbourhoodController.getSingle);
router.get(
  "/neighbourhoods/high-satisfaction/:squareFeet/:budget",
  neighbourhoodController.getByWOZbySquareFeed
);
router.get(
  "/neighbourhoods/high-satisfaction",
  neighbourhoodController.getHighestSatisfaction
);

// ROUTE DOES NOT EXITS
router.use("*", (req, res) => {
  res.status(404).json({
    error: "endpoint does not exist"
  });
});

module.exports = router;

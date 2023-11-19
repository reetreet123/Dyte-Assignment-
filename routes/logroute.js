const express = require("express");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middleware");

// Controllers
const logsController = require("../controllers/logscontroller");

router.route("/index").post(isLoggedIn, isAdmin, async (req, res) => {
  const { indexName, logDataArray } = req.body;
  const result = await logsController.indexLogs(indexName, logDataArray);
  res.json(result);
});

router.route("/search").get(isLoggedIn, async (req, res) => {
  const { indexName, fieldsToSearch } = req.body;
  let timestampFilter = {};
  if (req.body.timestampFilter) timestampFilter = req.body.timestampFilter;
  const result = await logsController.searchLogs(
    indexName,
    timestampFilter,
    fieldsToSearch
  );
  res.json(result);
});

module.exports = router;

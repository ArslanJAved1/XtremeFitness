const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var jsonParser = bodyParser.json({ limit: "100mb" });
const router = express.Router();
const db = require("../database/index");
router.use(cors());
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/all", jsonParser, (req, res) => {
  db.query("SELECT * FROM supplements", (err, res2) => {
    if (err) {
      return res.json(err);
    }
    res.json(res2);
  });
});

router.post("/add", jsonParser, (req, res) => {
  console.log("Post");
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid details");
  }
  if (data.title === undefined) {
    return res.status(500).json("Invalid details");
  }
  if (data.details === undefined) {
    return res.status(500).json("Invalid details");
  }
  if (data.image === undefined) {
    return res.status(500).json("Invalid details");
  }

  db.query(
    "INSERT INTO supplements(title,details,image) values(?,?,?)",
    [data.title, data.details, data.image],
    (err, res2) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      res.json(res2);
    }
  );
});

module.exports = router;

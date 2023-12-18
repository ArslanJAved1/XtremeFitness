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

router.get("/weeks", jsonParser, (req, res) => {
  db.query("SELECT * FROM week", (err, res2) => {
    if (err) {
      return res.json(err);
    }
    res.json(res2);
  });
});

router.get("/dayTime", jsonParser, (req, res) => {
  db.query("SELECT * FROM dayTime", (err, res2) => {
    if (err) {
      return res.json(err);
    }
    res.json(res2);
  });
});

router.get("/diets", jsonParser, (req, res) => {
  db.query("SELECT * FROM diet", (err, res2) => {
    if (err) {
      return res.json(err);
    }
    res.json(res2);
  });
});

router.post("/dietPlan", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.week === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.daytime === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  db.query(
    "SELECT d.id, d.name FROM dietPlan as dp inner join diet as d on dp.diet=d.id where dp.week=? and dp.daytime=?",
    [data.week, data.daytime],
    (err, res2) => {
      if (err) {
        console.log(res);
        return res.json(err);
      }
      res.json(res2);
    }
  );
});

router.post("/recip", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.diet === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  db.query(
    "SELECT r.id, r.recip FROM recip as r inner join dr as link on r.id=link.recip where link.diet=?",
    [data.diet],
    (err, res2) => {
      if (err) {
        console.log(res);
        return res.json(err);
      }
      res.json(res2);
    }
  );
});

router.post("/addWeek", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.week === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  db.query("INSERT INTO week(week) values(?)", [data.week], (err, res2) => {
    if (err) {
      console.log(res);
      return res.json(err);
    }
    res.json(res2);
  });
});

router.post("/addDayTime", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.daytime === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  db.query(
    "INSERT INTO dayTime(dayTime) values(?)",
    [data.daytime],
    (err, res2) => {
      if (err) {
        console.log(res);
        return res.json(err);
      }
      res.json(res2);
    }
  );
});

router.post("/addDiet", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.name === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  if (data.details === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.details.length < 1) {
    return res.status(500).json("details are empty");
  }

  db.query("INSERT INTO diet(name) values(?)", [data.name], (err, res2) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    const id = res2.insertId;
    const split = data.details.split("\n");
    split.map((detail) => {
      db.query("INSERT INTO recip(recip) values(?)", [detail], (err, res3) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        const other = res3.insertId;
        db.query(
          "INSERT INTO dr(diet,recip) values(?,?)",
          [id, other],
          (err, res4) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
          }
        );
      });
    });
    res.json(res2);
  });
});

router.post("/createPlan", jsonParser, (req, res) => {
  const data = req.body;
  if (data === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.week === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  if (data.daytime === undefined) {
    return res.status(500).json("Invalid plan details");
  }
  if (data.diet === undefined) {
    return res.status(500).json("Invalid plan details");
  }

  db.query(
    "INSERT INTO dietplan(week,daytime,diet) values(?,?,?)",
    [data.week, data.daytime, data.diet],
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

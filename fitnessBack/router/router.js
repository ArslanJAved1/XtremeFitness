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

/////// TEMP DATABASE /////////

const users = [];

router.get("/", jsonParser, (req, res) => {
  db.query("SELECT * FROM users", (err, res2) => {
    if (err) {
      return res.json(err);
    }
    res.json(res2);
  });
});

router.post("/createUser", jsonParser, (req, res) => {
  const user = req.body;
  if (user === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.email === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.username === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.password === undefined) {
    return res.status(500).json("Invalid user details");
  }
  const newUser = {
    email: user.email,
    username: user.username,
    password: user.password,
    phone: "NaN",
    address: "NONE",
  };
  users.push(newUser);
  db.query(
    "INSERT INTO users(email,username,password,phone,address) VALUES (?,?,?,?,?)",
    [
      newUser.email,
      newUser.username,
      newUser.password,
      newUser.phone,
      newUser.address,
    ],
    (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(res2);
    }
  );
  // res.json(newUser);
});

router.post("/login", jsonParser, (req, res) => {
  const user = req.body;
  if (user === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.username === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.password === undefined) {
    return res.status(500).json("Invalid user details");
  }
  db.query(
    "SELECT * FROM users where username=? and password=?",
    [user.username, user.password],
    (err, res2) => {
      if (err) {
        return res.status(404).json("Invalid username or password");
      }
      if (res2.length >= 1) {
        return res.json(res2);
      } else {
        return res.status(404).json("Invalid username or password");
      }
    }
  );
});

router.post("/profile", jsonParser, (req, res) => {
  const user_id = req.body;
  if (user_id === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user_id.user_id === undefined) {
    return res.status(500).json("Invalid user details");
  }
  db.query("SELECT * FROM users where id=?", [user_id.user_id], (err, res2) => {
    if (err) {
      return res.status(404).json("Invalid user_id");
    }
    if (res2.length >= 1) {
      return res.json(res2);
    } else {
      return res.status(404).json("Invalid user_id");
    }
  });
});

router.post("/updateUser", jsonParser, (req, res) => {
  const user = req.body;
  if (user === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.username === undefined) {
    return res.status(500).json("Invalid user details");
  }
  if (user.password === undefined) {
    return res.status(500).json("Invalid user details");
  }
  db.query(
    "UPDATE users SET email=?, username=?, password=?, phone=?, address=? WHERE id=?",
    [
      user.email,
      user.username,
      user.password,
      user.phone,
      user.address,
      user.id,
    ],
    (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(res2);
    }
  );
});

module.exports = router;

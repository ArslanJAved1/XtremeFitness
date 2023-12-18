const mysql = require("mysql");
const config = require("./config.js");

const GuestConnection = mysql.createConnection(config.guest);

function connect() {
  GuestConnection.connect((err) => {
    if (err) {
      console.log("There was an error trying to reconnect");
      connect();
    }
  });
}
connect();

module.exports = GuestConnection;

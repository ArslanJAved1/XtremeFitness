const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const router = require("./router/router");
const diet = require("./diet/diet");
const supp = require("./supplements/supplements");
const server = app.listen(port, () => {
  console.log("server is running on ", port);
});

app.use("/api", router);
app.use("/api/diet", diet);
app.use("/api/supp", supp);

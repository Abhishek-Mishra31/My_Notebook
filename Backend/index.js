const express = require("express");
const app = express();
const ConnectDB = require("./db");
const hostname = "127.0.0.1";
const port = 80;
var cors = require("cors");

ConnectDB();
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => res.send("HEY , Welcome to My_Notebook Server"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/contact", require("./routes/contact"));

app.listen(port, hostname, () => {
  console.log(`Successfully started Backend on http://${hostname}:${port}`);
});

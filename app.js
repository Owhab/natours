const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  res.status(200).send("Wow.. You can now post to this api..");
});

const port = 3000;
app.listen(port, () => {
  console.log("Natours app listen on port: ", port);
});

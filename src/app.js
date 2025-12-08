const express = require("express");

const app = express();

app.use(
  "/users",
  (req, res) => {
    console.log("Response 1");
    res.send("Response 1");
  },
  (req, res) => {
    console.log("Response 2");
    res.send("Response 2");
  }
);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

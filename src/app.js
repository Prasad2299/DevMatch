const express = require("express");

const app = express();

app.use(
  "/users",
  [(req, res,next) => {
    console.log("Response 1");
    // res.send("Response 1");
    next()
  },
  (req, res,next) => {
    console.log("Response 2");
    res.send("Response 2");
    next()
  },
  (req, res,next) => {
    console.log("Response 3");
    res.send("Response 3");
    next()
  },
  (req, res) => {
    console.log("Response 4");
    res.send("Response 4");
  }]
);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

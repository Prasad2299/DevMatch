const express = require("express");
const connectDb = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.use(express.json())

app.post("/signup",async(req,res)=>{
  console.log(req.body)
  const userObj = {
    firstName:"Prasad",
    lastName:"Ramphale",
    emailId:"pr@gmail.com",
    password:"pr123@"
  }

  const user = new User(userObj) // create new instance of user model

  try {
    await user.save()
    res.send("User created successfully!")
  } catch (error) {
    console.log("error saving user",error.message) 
    res.status(400).send("Error saving user")
  }
})

connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

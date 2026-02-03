const express = require("express");
const connectDb = require("./config/database");
const { User } = require("./models/user");
const {validateSignup} = require('./utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const {authUser} = require('./middlewares/auth')

const app = express();

app.use(express.json())
app.use(cookieParser())

app.post("/signup",async(req,res)=>{
  console.log(req.body)
  try {
  const {firstName,lastName,emailId,password} = req.body;
  // validate the data
  validateSignup(req)
  //encrypt the password
  const passwordHash = await bcrypt.hash(password,10)
  console.log(passwordHash)
  // create new instance of user model
  const user = new User({
    firstName,lastName,emailId,password:passwordHash
  })

  await user.save()
    res.send("User created successfully!")
  } catch (error) {
    console.log("error saving user",error.message) 
    res.status(400).send("Error saving user"+error)
  }
})

app.post("/login",async(req,res)=>{
  try {
    const {emailId,password} = req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("Invalid emailid")
    }
    const user = await User.findOne({emailId:emailId})
    if(!user){
      res.status(404).send("invalid credentiala!")
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)

    // const isPasswordMatch = await user.validatePassword(password)

    if(isPasswordMatch){
      //create JWT token
      const token = await jwt.sign({_id:user._id},"DEVMATCH",{expiresIn:"1d"})
      // const token = await user.getJWT();
      //ADD TOKEN TO COOKIE AND SEND RESPONSE BACK TO USER
      res.cookie("token",token)
      res.status(200).send("Login Successfully!")
    }else{
      throw new Error("invalid credential!")
    }
  } catch (error) {
    res.status(400).send("Error"+error)
  }
})

//user profile

app.get("/profile",authUser,async(req,res)=>{
  try {
    const user = req.user
    res.send("Logged in user :" + user)
  } catch (error) {
    res.status(500).send("Internal server error!")
  }
})

app.post("/sendConnectionRequest",authUser,(req,res)=>{
  try {
    const user = req.user
    res.send(user.firstName + " sent connection request")
  } catch (error) {
    res.status(400).send("bad request")
  }
})

// get user by id

app.get("/user",async(req,res)=>{
  const id = req.body.id
  console.log(id)
  try {
    const user = await User.findById(id)
    if(!user){
      res.status(404).send("user not found!")
    }else{
      res.status(200).send(user)
    }
  } catch (error) {
    res.status(400).send("something went wrong!")
  }
})

//get user by emailId
app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId
  try{
    const user  = await User.findOne({emailId:userEmail})
    if(!user){
      res.status(404).send("user not found!")
    }else{
      res.status(200).send(user)
    }
  }catch(err){
    res.status(400).send("something went wrong!")
  }
})

app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId
  try{
    const users = await User.find({emailId:userEmail})
    if(users.length === 0){
      res.status(404).send("User not found!")
    }
    else{
     res.status(200).send(users)
    }
  }catch(err){
    console.log(err)
    res.status(400).send("something went wrong!")
  }
})


//feed - get all users from the database

app.get("/feed",async(req,res)=>{
  try{
    const users = await User.find({})
    res.status(200).send(users)
  }catch(err){
    console.log(err)
    res.status(400).send("something went wrong!")
  }
})

// to update data

app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId
  const data = req.body
  try {
    // api level validation
    const ALLOWED_UPDATES = [
      "photoURL","about","age","gender","skills"
    ]
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))
    if(!isUpdateAllowed){
      throw new Error("Updated not allowed!")
    }
    const user = await User.findByIdAndUpdate(userId,data,{runValidators:true})
    res.status(200).send("user updated successfully!")
  } catch (error) {
    res.status(400).send("something went wrong!"+error)
  }
})

//to update user with emailid

app.patch("/userByEmail",async(req,res)=>{
  const email = req.body.email
  const data = req.body
  try {
    await User.findOneAndUpdate({emailId:email},data)
    res.status(200).send("user updated successfully!")
  } catch (error) {
    res.status(400).send("something went wrong!")
  }
})

// to delete data

app.delete("/user",async(req,res)=>{
  const id = req.body.id
  try {
    await User.findByIdAndDelete(id)
    res.status(200).send("user deleted successfully!")
  } catch (error) {
    res.status(400).send("Something went wrong!")
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

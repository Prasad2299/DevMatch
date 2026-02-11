const express = require('express');
const { validateSignup } = require('../utils/validation');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const validator = require('validator')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

authRouter.post("/signup",async(req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
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
      res.cookie("token",token)// expires inside object we can pass to expire cookie
      res.status(200).send("Login Successfully!")
    }else{
      throw new Error("invalid credential!")
    }
  } catch (error) {
    res.status(400).send("Error"+error)
  }
})

authRouter.post("/logout",async(req,res)=>{
  try {
    res.cookie("token",null,{
      expires: new Date(Date.now())
    })
    res.status(200).send("Logout successfully!")
  } catch (error) {
    console.log(error)
    res.status(400).send("Unable to logout!",error)
  }
})




module.exports = authRouter
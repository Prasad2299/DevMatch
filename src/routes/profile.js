const express = require('express')
const { authUser } = require('../middlewares/auth')
const {validateEditData} = require('../utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')

const profileRouter = express.Router()

profileRouter.get("/profile/view",authUser,async(req,res)=>{
  try {
    const user = req.user
    res.status(200).json({message:"User fetched successfully!",user})
  } catch (error) {
    res.status(500).send("Internal server error!")
  }
})

profileRouter.patch("/profile/update",authUser,async(req,res)=>{
  try {
    const authenticUser = req.user;

    // we can't edit all field so we have validated field which are updating
    if(!validateEditData(req)){
      throw new Error("Invalid edit fields!")
    }

    Object.keys(req.body).forEach((item) => (authenticUser[item] = req.body[item]))

    const updatedUser = await authenticUser.save()
      // console.log("after",updatedUser)
    res.status(200).json({
      message:'Profile updated successfully!',
      updatedUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal server error!"})
  }
})

profileRouter.patch("/profile/password/update",authUser,async(req,res)=>{
  try {
    const {password,newPassword} = req.body
    const loggedIn = req.user
    console.log(loggedIn)
    const isPasswordCorrect = await bcrypt.compare(password,loggedIn.password)
    console.log(isPasswordCorrect)
    
    if(!isPasswordCorrect){
      throw new Error("Invalid password!")
    }

    const isPasswordStrong = validator.isStrongPassword(newPassword)
    console.log(isPasswordStrong)

    if(!isPasswordStrong){
      throw new Error("Please enter strong password!")
    }
    const newHashPass = await bcrypt.hash(newPassword,10)
    console.log(newHashPass)
    loggedIn.password = newHashPass;
    await loggedIn.save()
    res.status(200).json({
      message:'Password updated successfully!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:'Internal server error!'
    })
  }
})
module.exports = profileRouter
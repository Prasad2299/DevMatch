const express = require('express')
const { authUser } = require('../middlewares/auth')

const profileRouter = express.Router()

profileRouter.get("/profile",authUser,async(req,res)=>{
  try {
    const user = req.user
    res.send("Logged in user :" + user)
  } catch (error) {
    res.status(500).send("Internal server error!")
  }
})

module.exports = profileRouter
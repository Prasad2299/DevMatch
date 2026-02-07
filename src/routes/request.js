const express = require('express')
const { authUser } = require('../middlewares/auth')

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest",authUser,(req,res)=>{
  try {
    const user = req.user
    res.send(user.firstName + " sent connection request")
  } catch (error) {
    res.status(400).send("bad request")
  }
})

module.exports = requestRouter
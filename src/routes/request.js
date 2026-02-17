const express = require('express')
const { authUser } = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const { User } = require('../models/user')

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId",authUser,async(req,res)=>{
  try {
    const loggedInUser = req.user
    const status = req.params.status
    const toUserId = req.params.toUserId
    const fromUserId = loggedInUser._id

    console.log({status,fromUserId,toUserId})


    const allowStatusField = ["interested","ignored"]
    const allowStatus = allowStatusField.includes(status)
    if(!allowStatus){
      return res.status(400).json({
        message:"Invalid status!"
      })
    }

    //if request send to itself

    console.log(fromUserId.equals(toUserId))

    // if(fromUserId.equals(toUserId)){
    //   return res.status(400).json({
    //     message:'You cannot sent request to yourself!'
    //   })
    // }
    
    //if toUserId is not there into DB.

    const toUser = await User.findById(toUserId)
    console.log(toUser)

    if(!toUser){
      return res.status(400).json({
        message:'User not found!'
      })
    }

    //check existing request 

    const existingRequest = await ConnectionRequest.findOne({
      $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
    })

    if(existingRequest){
      return res.status(400).json({
        message:'Connection request is already exist!'
      })
    }

    const connRequest = new ConnectionRequest({fromUserId,toUserId,status})
    const data = await connRequest.save()
    res.status(200).json({
      message:'Connection request sent successfully!',
      data
    })

  } catch (error) {
    console.log(error)
    res.status(400).send("bad request")
  }
})

module.exports = requestRouter
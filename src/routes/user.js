const express = require('express')
const { authUser } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router()

// get user pending connection requests for loggedIn User. means status is interested.

userRouter.get("/user/requests/received",authUser,async(req,res)=>{
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"interested"
    }).populate("fromUserId",["firstName","lastName"])

    //you can also use this .populate("fromUserId","firstName lastName"])

    if(!requests){
      return res.status(404).json({
        message:"Request not found!"
      })
    }

    return res.status(200).json({
      message:"Requests fetched successfully!",
      requests
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message:'Something went wrong!'
    })
  }
})

// get user connections -- means user connected to the loggediIn user.

userRouter.get("/user/connections",authUser,async(req,res)=>{

  try {
    const loggediInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or:[{fromUserId:loggediInUser._id,status:"accepted"},{toUserId:loggediInUser._id,status:"accepted"}]
    }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName")
    
    const data = await connections.map((row) => {
      if(row.fromUserId._id.toString()===loggediInUser._id.toString()){
         return row.toUserId;
      }
      if(row.toUserId._id.toString()===loggediInUser._id.toString()){
         return row.fromUserId;
      }
        // return row.fromUserId;
      })
    if(!connections){
      return res.status(404).json({
        message:'Connections not found!'
      })
    }

    return res.status(200).json({
      message:`${loggediInUser.firstName} connections!`,
      data
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message:'Something went wrong!'
    })
  }
})

module.exports = userRouter
const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  status:{
    type:String,
    required:true,
    enum:{
      values:["interested","ignored","accepted","rejected"],
      message:`{VALUE} is invalid`
    }
  }
},{timestamps:true})

// schema level validation
connectionRequestSchema.pre("save",function(next){
  const connRequest = this
  //check fronuserid is same as touserid
  if(connRequest.fromUserId.equals(connRequest.toUserId)){
    throw new Error("You cannnot send request to yourself!")
  }
  next()
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequest
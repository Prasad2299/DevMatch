const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",// reference to the User collection
    required:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
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


//indexing(compound indexing)

connectionRequestSchema.index({fromUserId:1,toUserId:1})

// schema level validation
// connectionRequestSchema.pre("save",function(next){
//   const connRequest = this
//   //check fronuserid is same as touserid
//   console.log("schema level validation")
//   if(connRequest.fromUserId.equals(connRequest.toUserId)){
//     throw new Error("You cannnot send request to yourself!")
//     // return next(new Error("You cannnot send request to yourself!")) // return next error to avoid error next is not function
//   }
//   console.log("if there is no schema level validation")
//   next()
// })

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequest
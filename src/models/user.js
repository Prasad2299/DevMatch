const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:10
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true
  },
    password:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("Gender is not valid!");
      }
    }
  },
  photoURL:{
    type:String,
    default:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
  },
  about:{
    type:String,
    default:"This is default about."
  },
  skills:{
    type:[String]
  }
},{timestamps:true})

module.exports.User = mongoose.model("User",userSchema)
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email")
      }
    }
  },
    password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Password is not strong!")
      }
    }
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    validate(value){//schema level validation
      if(!["male","female","other"].includes(value)){
        throw new Error("Gender is not valid!");
      }
    }
  },
  photoURL:{
    type:String,
    default:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid URL!")
      }
    }
  },
  about:{
    type:String,
    default:"This is default about."
  },
  skills:{
    type:[String]
  }
},{timestamps:true})

// userSchema.method.validatePassword = async function (passwordInputByUser) {
//   const user = this;
//   const passwordHash = user.password;
//   const isPasswordMatch = bcrypt.compare(passwordInputByUser,passwordHash)

//   return isPasswordMatch;
// }

// userSchema.methods.getJWT = async function() {
//   const user = this;
//   const token = await jwt.sign({_id:user._id},"DEVMATCH",{expiresIn:"1d"})

//   return token;
// }

module.exports.User = mongoose.model("User",userSchema)
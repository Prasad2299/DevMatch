const jwt = require('jsonwebtoken')
const {User} = require('../models/user')

const authUser = async(req,res,next) =>{
  try {
      // Read token from cookies

  const {token} = req.cookies
  if(!token){
    throw new Error("invalid token")
  }
  //validate token

  const decodedMsg = await jwt.verify(token,"DEVMATCH")
  const {_id}  = decodedMsg

  //find the user

  const user = await User.findById(_id)
  if(!user){
    throw new Error("User not found!");
  }
  
  req.user = user
  next()
  } catch (error) {
    res.status(400).send("bad request")
  }

}

module.exports = {authUser}
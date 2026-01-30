const validator = require('validator')

const validateSignup = (req) =>{
  const {firstName,lastName,emailId,password} = req.body;

  if(!firstName || !lastName){
    throw new Error("Name is not there!");
  }
  if(!validator.isEmail(emailId)){
    throw new Error("Email invalid!")
  }
  if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password!")
  }
}

module.exports = {validateSignup}
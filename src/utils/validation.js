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

const validateEditData = (req) =>{
    const allowedField = ["firstName","lastName","photoURL","about","skills"]

    const isAllowedEditField = Object.keys(req.body).every((key)=> allowedField.includes(key))

    console.log(isAllowedEditField)

    return isAllowedEditField;
}

module.exports = {validateSignup,validateEditData}
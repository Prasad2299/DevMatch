const authAdmin = (req,res,next) =>{
  const token = "xyz"
  const isAdminAutherized = token === "xyz"
  if(!isAdminAutherized){
    res.status(401).send("Unauthorized Admin!!!")
  }else{
    next()
  }
}

const authUser = (req,res,next) =>{
  const token = "xyz"
  const isUserAutherized = token === "xyz"
  if(!isUserAutherized){
    res.status(401).send("Unauthorized User!!!")
  }else{
    next()
  }
}

module.exports = {authAdmin,authUser}
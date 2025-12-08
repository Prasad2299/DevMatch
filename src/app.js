const express = require("express");

const app = express();

const {authAdmin,authUser} =  require('./middlewares/auth')

// app.use("/admin",(req,res,next)=>{
//   const token = "xyz"
//   const isAdminAutherized = token === "xyz"
//   if(!isAdminAutherized){
//     res.status(401).send("Unauthorized Admin!!!")
//   }else{
//     next()
//   }
// })

app.post("/user/login",(req,res)=>{
  res.send("User login!")
})

app.get("/user/getUserData",authUser,(req,res)=>{
  res.send("user data fetched!")
})

app.get("/admin/getAllData",authAdmin,(req,res)=>{
  console.log("get All data")
  res.send("data fetched!!")
})

app.delete("/admin/deleteData",authAdmin,(req,res)=>{
  console.log("get All data")
  res.send("data deleted!!")
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

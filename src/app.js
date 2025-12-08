const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=>{
  const token = "xyz"
  const isAdminAutherized = token === "xyz"
  if(!isAdminAutherized){
    res.status(401).send("Unauthorized Admin!!!")
  }else{
    next()
  }
})

app.get("/admin/getAllData",(req,res)=>{
  console.log("get All data")
  res.send("data fetched!")
})

app.delete("/admin/deleteData",(req,res)=>{
  console.log("get All data")
  res.send("data deleted!!")
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

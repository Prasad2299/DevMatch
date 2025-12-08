const express = require("express");

const app = express();


app.get("/admin/getAllData",(req,res)=>{
  console.log("get All data")
  const token = "xyz"
  const isAdminAutherized = token === "xyz"
  if(isAdminAutherized){
    res.send("data has been fetched!")
  }else{
    res.status(401).send("Unauthorized Admin!!!")
  }
})

app.delete("/admin/deleteData",(req,res)=>{
  console.log("get All data")
  const token = "xyz"
  const isAdminAutherized = token === "xyz"
  if(isAdminAutherized){
    res.send("data has been deletedS!")
  }else{
    res.status(401).send("Unauthorized Admin!!!")
  }
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

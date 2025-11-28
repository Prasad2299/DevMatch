const express = require("express")

const app = express()

app.get("/user",(req,res)=>{
  res.send({name:"prasad"})
})

app.post("/user",(req,res)=>{
  res.send("data saved to db successfully!")
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})
const express = require("express")

const app = express()

app.get("/user",(req,res)=>{
  console.log(req.query)// to acces data from req.query parameter
  res.send({name:"prasad"})
})

app.get("/user/:userId",(req,res)=>{
  console.log(req.params)// to acces data from dynamic values from request parameter
  res.send({name:"prasad"})
})

app.get("/user/:userId/:name",(req,res)=>{
  console.log(req.params)// to acces data from dynamic values from request parameter
  res.send({name:"prasad"})
})


app.post("/user",(req,res)=>{
  res.send("data saved to db successfully!")
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})
const express = require("express")

const app = express()

app.use("/hello",(req,res)=>{
  res.send("hello from hello request")
})

//function inside app.use is request handler function respond to incoming request on server.
app.use((req,res)=>{
  res.send("Hello world from server!")
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})
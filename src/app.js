const express = require("express");

const app = express();




app.get("/user/getUserData",(req,res)=>{
  //logic for database and fetched data
  try {
  // if there is error while fetching data

  throw new Error("sdfefdfds")

  res.send("user data fetched!")    
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong!!")
  }
})

//always put this error middleware at last 
// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("Something went wrong!")
//   }
// })


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

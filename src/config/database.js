const mongoose = require("mongoose");

const connectDb = async () => {
  console.log("inside")
  await mongoose.connect(
    "mongodb+srv://developer:developer@nodejs.zpwmuzl.mongodb.net/devMatch?appName=nodejs"
    // "mongodb+srv://developer:ykVxBevEyRSyJG9I@nodejs.zpwmuzl.mongodb.net/devMatch"// connecting to devMatch database from mongodb cluster
  );
};

module.exports = connectDb


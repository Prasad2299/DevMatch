const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://developer:ykVxBevEyRSyJG9I@nodejs.zpwmuzl.mongodb.net/devMatch"// connecting to devMatch database from mongodb cluster
  );
};

module.exports = connectDb


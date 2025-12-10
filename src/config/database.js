const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://developer:ykVxBevEyRSyJG9I@nodejs.zpwmuzl.mongodb.net/"// connecting mongodb cluster
  );
};

connectDb()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

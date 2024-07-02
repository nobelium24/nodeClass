const mongoose = require("mongoose");

const connectDb = async () => {
  const connectionString = process.env.MONGODB_URI;

  try {
    const connect = await mongoose.connect(connectionString);

    if (connect) {
      console.log("Connection Established successfully");
    } else {
      console.log("Error connectiong to database");
    }
    
  } catch (error) {
    console.log("Error Connecting to db : ", error);
  }
};

module.exports = connectDb;
import mongoose from "mongoose";
import chalk from "chalk";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log(
      chalk.bgRed.white("Connected to MongoDB Atlas!"),
      chalk.bgBlue.white(`${process.env.DATABASE_NAME}`),
    );
  } catch (error) {
    console.error("Error connecting:", error.message);
  }
};

export default dbConnection;

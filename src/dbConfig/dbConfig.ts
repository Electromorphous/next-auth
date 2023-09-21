import mongoose from "mongoose";

export async function connect() {
  try {
    if (process.env.MONGODB_URI) {
      mongoose.connect(process.env.MONGODB_URI);

      mongoose.connection.on("connected", () => {
        console.log("Mongo DB connected successfully");
      });
      mongoose.connection.on("error", (err) => {
        console.error(
          "Mongo DB connection error. Please make sure MongoDB is running."
        );
        console.error(err);
        process.exit();
      });
    } else {
      console.error("MongoDB URI could not resolve");
      process.exit();
    }
  } catch (error) {
    console.error("Something went wrong");
    console.error(error);
  }
}

import mongoose from "mongoose";

export function dbConnection() {
  const params = {
    useNewURLParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://venki_mentor:venki_mentor@cluster0.5ojshx2.mongodb.net/?retryWrites=true&w=majority",
      params
    );
    console.log("mongo connected successfully");
  } catch (error) {
    console.log("Error connecting to", error);
  }
}
export default dbConnection;

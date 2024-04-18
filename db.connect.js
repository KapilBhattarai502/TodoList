import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://kapilbhattarai502:dob205807@trainingdatabase.jyqv7zv.mongodb.net/`);
    console.log("DB CONNECTED SUCCESSFULLY!!");
  } catch (error) {
    console.log("PROBLEM IN CONNECTING!!!");
    console.log(error.message);
  }
};
export { dbConnect };
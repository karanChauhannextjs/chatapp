import mongoose from "mongoose";

const ConnectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("error Occured", error);
    });
};

export default ConnectDB;

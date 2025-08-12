// config/gridfs.ts
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/virtual_classroom"; // غيره حسب بيئتك

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: Date.now() + "-" + file.originalname,
      bucketName: "uploads" // اسم مجموعة GridFS
    };
  }
});

export const upload = multer({ storage });
export const connectDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("✅ Connected to MongoDB");
};

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Initialize App
let app = express();

//Import Routes
import SingleFileUploadRoute from "./Routes/FileUpload.route.js";

//Server PORT number
let PORT = process.env.PORT || 3000;

//Upload folder access staticly
let UploadFolder = path.join(__dirname, "uploads");
app.use("/uploads", express.static(UploadFolder));

//Home Route
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

//Routes Middleware
app.use("/upload", SingleFileUploadRoute);

//Multer Error Handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json({
            success: "failure",
            message: "File to Large! Maximum Size is 1Mb",
          });
      default:
        return res
          .status(400)
          .json({ success: "failure", message: err.message });
    }
  } else {
    return res.status(400).json({ success: "failure", message: err.message });
  }
});

//Application listening 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import multer from "multer";
import path from "path";
import { v4} from "uuid";
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    // let newName = `${Date.now()}-${Math.round(
    //   Math.random() * 1e9
    // )}${extension}`;
    let newName = `${v4()}${extension}`;
    cb(null, newName);
  },
});
//File size max 1mb
let File_Size = 1 * 1024 * 1024;
//File Extension Filter
let File_Filter = (req, file, cb) => {
  const allowedType = /jpeg|jpg|png|pdf/;
  const isAllowed = allowedType.test(file.mimetype);
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG,PNG and PDF file are allowed"), false);
  }
};
//Multer file upload
let upload = multer({
  storage: storage,
  limits: {
    fileSize: File_Size,
  },
  fileFilter: File_Filter,
});

export default upload;

import multer from "multer";

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

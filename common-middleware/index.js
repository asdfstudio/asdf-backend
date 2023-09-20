const jwt = require("jsonwebtoken");

const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
// const multer = require("multer");
// const shortid = require("shortid");
// const path = require("path");
//const multerS3 = require("multer-s3");
//const aws = require("aws-sdk");

// const cloudinary = require("cloudinary").v2;
// const cloudinaryStorage = require("cloudinary-multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });



// cloudinary

// cloudinary.config({ 
//   cloud_name: 'hawktech-cloud', 
//   api_key: '633644399681347', 
//   api_secret: '99Iqi-YUY6tfMb4zD4tyXbhRVi0',
//   secure: true
// });
// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
// });
// exports.upload = multer({
//   storage: storage,
// });




// amazon s3

//const accessKeyId = process.env.accessKeyId;
//const secretAccessKey = process.env.secretAccessKey;

/*const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});*/

/*
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "flipkart-clone-app",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
*/

// real
// exports.upload = multer({ storage });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage: storage });

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
  };


exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "superAdmin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Super Admin access denied" });
  }
  next();
};

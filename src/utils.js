const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
const aws = require("aws-sdk");
const APP_SECRET = "GraphQL-is-aw3some";
const {
  accessKeyId,
  secretAccessKey,
  Bucket,
  api_key,
  api_secret
} = require("../config/credentials");
const cloudinary = require("cloudinary");

const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated");
};

// s3
// const processUpload = async file => {
//   if (!file) {
//     console.log("Error: No file received");
//   } else {
//     console.log("file coming", file);
//   }
//   const { filename, createReadStream } = await file;
//   const key = uuid() + "-" + filename;
//   const s3 = new aws.S3({
//     accessKeyId,
//     secretAccessKey,
//     Bucket
//   });
//   await s3.createBucket();
//   const params = {
//     Bucket,
//     Key: key,
//     Body: createReadStream()
//   };
//   try {
//     const data = await s3.upload(params).promise();
//     const location = data.Location;
//     return location;
//   } catch (e) {
//     console.log(e);
//   }
// };

// cloudinary
const processUpload = async file => {
  if (!file) {
    console.log("Error: No file received");
  } else {
    console.log("file coming", file);
  }
  const { filename, createReadStream } = await file;
  const stream = createReadStream();
  cloudinary.config({ cloud_name: "qq", api_key, api_secret });
  try {
    const fileUrl = await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream(
        { public_id: filename },
        (err, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(err);
          }
        }
      );
      stream.pipe(streamLoad);
    });
    return fileUrl;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  APP_SECRET,
  getUserId,
  processUpload
};

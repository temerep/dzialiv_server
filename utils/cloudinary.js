const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;

const initializeCloudinary = () => {
  const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name: cloudinaryUrl.hostname,
    api_key: cloudinaryUrl.username,
    api_secret: cloudinaryUrl.password,
    secure: true,
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'samples',
      format: 'webp',
      quality: 'auto',
      flags: 'lossy',
      fetch_format: 'auto'
    }
  });

  const upload = multer({ storage });

  return upload;
};

module.exports = {
  initializeCloudinary,
};

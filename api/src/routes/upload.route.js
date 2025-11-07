import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// ✅ Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'blog_uploads', // Folder name in Cloudinary
    format: file.mimetype.split('/')[1], // Automatically get format (jpg, png, etc.)
    public_id: Date.now() + '-' + file.originalname.split('.')[0], // Unique name
  }),
});

// ✅ Initialize multer with Cloudinary storage
const upload = multer({ storage });

// ✅ Route to upload image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path, // Cloudinary image URL
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

export default router;

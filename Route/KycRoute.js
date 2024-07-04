const express = require('express');
const multer = require('multer');
const path = require('path');
const KycController = require('../controllers/KycController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post(
  '/create-form',
  upload.fields([{ name: 'frontId' }, { name: 'backId' }]),
  KycController.createForm
);
router.get('/get-forms', KycController.getForms);

module.exports = router;

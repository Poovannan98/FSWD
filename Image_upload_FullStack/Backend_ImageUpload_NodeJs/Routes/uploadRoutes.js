const express = require('express');
const multer = require('multer');
const uploadController = require('../Controllers/uploadController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('photo'), uploadController.uploadImage);
router.get('/latest', uploadController.getLatestImage);
router.get('/all', uploadController.getAllImages);


module.exports = router;
const Image = require('../Models/Image');

exports.uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      name: req.body.name,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

// ✅ Serve latest image from MongoDB
exports.getLatestImage = async (req, res) => {
  try {
    const image = await Image.findOne().sort({ _id: -1 }); // latest image
    if (!image) return res.status(404).send('No image found');

    res.set('Content-Type', image.img.contentType);
    res.send(image.img.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};


exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 }); // latest first
    const formatted = images.map(img => ({
      _id: img._id,
      name: img.name,
      contentType: img.img.contentType,
      data: img.img.data.toString('base64'), // convert buffer to base64
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
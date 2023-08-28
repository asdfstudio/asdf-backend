const path = require('path');
exports.storage = (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.fileName);
    res.sendFile(imagePath);
  };
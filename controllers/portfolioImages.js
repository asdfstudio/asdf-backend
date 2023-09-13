const db = require('../lib/db.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

exports.createPortfolioImages = (req, res) => {
  const files = req.files;
  const portfolioId = req.body.portfolioId;
  const matchID = `SELECT id FROM portfolio WHERE id = ?`;
  db.query(matchID, [portfolioId], (err, result) => {
    if (result[0] == null) {
      return res.status(400).send({
        message: `Invalid portfolio not found`,
      });
    } 
        files.forEach((file, index) => {
        const filename = file.filename;
        const query = 'INSERT INTO portfolio_pictures (id, `portfolio_image_id`, `image`, `sortedOrder`) VALUES (?, ?, ?, ?)';
        db.query(query, [uuid.v4(), portfolioId, filename, index], (err, result) => {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          }
        });
      });
      return res.status(201).send({
        message: 'Portfolio Images Added!',
    });
  });
};


exports.updatePortfolioImages = (req, res) => {
  const files = req.files;
  const portfolioId = req.body.portfolioId;

  const selectPortfolioImagesQuery = `
    SELECT id, image 
    FROM portfolio_pictures 
    WHERE portfolio_image_id = ?`;

  db.query(selectPortfolioImagesQuery, [portfolioId], (err, existingImages) => {
    if (err) {
      return res.status(400).send({ message: err });
    }

    const deleteImagesPromises = existingImages.map((image) => {
      return new Promise((resolve) => {
        const imagePathToDelete = path.join(__dirname, "../uploads", image.image);
        fs.unlink(imagePathToDelete, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }

          const deleteImageQuery = 'DELETE FROM portfolio_pictures WHERE id = ?';
          db.query(deleteImageQuery, [image.id], (deleteErr) => {
            if (deleteErr) {
              console.error("Error deleting image from the database:", deleteErr);
            }
            resolve();
          });
        });
      });
    });

    Promise.all(deleteImagesPromises)
      .then(() => {
        const insertImagesPromises = files.map((file, index) => {
          const filename = file.filename;
          const insertImageQuery = 'INSERT INTO portfolio_pictures (id, `portfolio_image_id`, `image`, `sortedOrder`) VALUES (?, ?, ?, ?)';
          return new Promise((resolve) => {
            db.query(insertImageQuery, [uuid.v4(), portfolioId, filename, index], (insertErr) => {
              if (insertErr) {
                console.error("Error inserting image into the database:", insertErr);
              }
              resolve();
            });
          });
        });

        Promise.all(insertImagesPromises)
          .then(() => {
            return res.status(201).send({
              message: 'Portfolio Images Updated!',
            });
          })
          .catch((insertionError) => {
            return res.status(400).send({
              message: insertionError,
            });
          });
      })
      .catch((deletionError) => {
        return res.status(400).send({
          message: deletionError,
        });
      });
  });
};

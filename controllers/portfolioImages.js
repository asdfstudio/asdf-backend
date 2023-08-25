const db = require('../lib/db.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

exports.createPortfolioImages = (req, res) => {
  const files = req.files;
  const portfolioId = req.body.portfolio_image_id;
  const matchID = `SELECT id FROM portfolio WHERE id = ?`;
  db.query(matchID, [portfolioId], (err, result) => {
    if (result[0] == null) {
      return res.status(400).send({
        message: 'Invalid not found',
      });
    } 
      files.forEach(file => {
        const filename = file.filename;
        const query = 'INSERT INTO portfolio_pictures (id, `portfolio_image_id`, `image`) VALUES (?, ?, ?)';
        db.query(query, [uuid.v4(), portfolioId, filename], (err, result) => {
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

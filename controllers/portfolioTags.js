const db = require('../lib/db.js');
const uuid = require('uuid');

exports.createPortfolioTags = (req, res) => {
  const {portfolioId, tags} = req.body;

  const matchID = `SELECT id FROM portfolio WHERE id = ?`;

  db.query(matchID, [portfolioId], (err, result) => {
    if (result[0] == []) {
      return res.status(400).send({
        message: 'Invalid! Portfolio Not found',
      });
    }

    const query = 'INSERT INTO portfolio_tags (id, `portfolio_tag_id`, `tag`) VALUES (?, ?, ?)';

    for (const tag of tags) {
      db.query(query, [uuid.v4(), portfolioId, tag.tag], (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        }
      });
    }

    return res.status(201).send({
      message: 'Portfolio Tags Added!',
    });
  });
};

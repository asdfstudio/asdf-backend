const db = require('../lib/db.js');
const uuid = require('uuid');

exports.createPortfolioTags = (req, res) => {
  const { portfolioId, tags } = req.body;

  const matchID = 'SELECT id FROM portfolio WHERE id = ?';

  db.query(matchID, [portfolioId], (err, result) => {
    if (result[0] == []) {
      return res.status(400).send({
        message: 'Invalid! Portfolio Not found',
      });
    }

    const checkTagQuery = 'SELECT COUNT(*) AS count FROM portfolio_tags WHERE `portfolio_tag_id` = ? AND `tag` = ?';

    for (const tag of tags) {
      db.query(checkTagQuery, [portfolioId, tag.tag], (checkErr, checkResult) => {
        if (checkErr) {
          return res.status(400).send({
            message: checkErr,
          });
        }

        if (checkResult[0].count === 0) {
          const insertTagQuery = 'INSERT INTO portfolio_tags (id, `portfolio_tag_id`, `tag`) VALUES (?, ?, ?)';
          db.query(insertTagQuery, [uuid.v4(), portfolioId, tag.tag], (insertErr, insertResult) => {
            if (insertErr) {
              return res.status(400).send({
                message: insertErr,
              });
            }
          });
        }
      });
    }

    return res.status(201).send({
      message: 'Portfolio Tags Added!',
    });
  });
};


exports.updatePortfolioTags = (req, res) => {
  const { portfolioId, tags } = req.body;

  const matchID = 'SELECT id FROM portfolio WHERE id = ?';

  db.query(matchID, [portfolioId], (err, result) => {
    if (result[0] == []) {
      return res.status(400).send({
        message: 'Invalid! Portfolio Not found',
      });
    }

    const getCurrentTagsQuery = 'SELECT `tag` FROM portfolio_tags WHERE `portfolio_tag_id` = ?';
    db.query(getCurrentTagsQuery, [portfolioId], (getCurrentTagsErr, currentTagsResult) => {
      if (getCurrentTagsErr) {
        return res.status(400).send({
          message: getCurrentTagsErr,
        });
      }

      const currentTags = currentTagsResult.map((row) => row.tag);

      const tagsToAdd = tags.filter((tag) => !currentTags.includes(tag.tag));
      const tagsToRemove = currentTags.filter((tag) => !tags.some((newTag) => newTag.tag === tag));

      if (tagsToRemove.length > 0) {
        const removeTagsQuery = 'DELETE FROM portfolio_tags WHERE `portfolio_tag_id` = ? AND `tag` IN (?)';
        db.query(removeTagsQuery, [portfolioId, tagsToRemove], (removeTagsErr, removeTagsResult) => {
          if (removeTagsErr) {
            return res.status(400).send({
              message: removeTagsErr,
            });
          }
        });
      }

      for (const tag of tagsToAdd) {
        const insertTagQuery = 'INSERT INTO portfolio_tags (id, `portfolio_tag_id`, `tag`) VALUES (?, ?, ?)';
        db.query(insertTagQuery, [uuid.v4(), portfolioId, tag.tag], (insertErr, insertResult) => {
          if (insertErr) {
            return res.status(400).send({
              message: insertErr,
            });
          }
        });
      }

      return res.status(201).send({
        message: 'Portfolio Tags Updated!',
      });
    });
  });
};

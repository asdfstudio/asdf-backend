const db = require('../lib/db.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const { portfolioTimeSpent, portfolioVisitors } = require('./visitors.js');

exports.createPortfolio = (req, res) => {
  const { name, desc } = req.body;
  const coverImage = req.file?.filename;
  const portfolioId = uuid.v4();
  db.query(
    'INSERT INTO portfolio (id, name, `desc`, `coverImage`, createdAt, `sortedOrder`) VALUES (?, ?, ?, ?, now(), DEFAULT);',
      [portfolioId, name, desc, coverImage],
      (err, result) => {
      if (err) {
          return res.status(400).send({
          message: err,
          });
      }
      return res.status(201).send({
          message: 'Portfolio Added!',
          portfolioId: portfolioId,
      });
      }
  );
};

exports.updatePortfolio = (req, res) => {
  const { id, name, desc } = req.body;
  const coverImageUpdate = req.file?.filename;

  db.query('SELECT * FROM portfolio WHERE id = ? LIMIT 1', [id], (err, rows) => {
    if (err) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }

    if (rows.length === 0) {
      return res.status(404).send({ message: 'Portfolio not found' });
    }

    if (coverImageUpdate) {
      const oldCoverImage = rows[0].coverImage;

      if (oldCoverImage) {
        const oldCoverImagePathToDelete = path.join(__dirname, "../uploads", oldCoverImage);
        fs.unlink(oldCoverImagePathToDelete, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting old cover image:', unlinkErr);
          }
        });
      }

      const updateQuery = 'UPDATE portfolio SET name = ?, `desc` = ?, `coverImage` = ?, createdAt = now() WHERE id = ?';
      db.query(
        updateQuery,
        [name, desc, coverImageUpdate, id],
        (updateErr, updateResult) => {
          if (updateErr) {
            return res.status(400).send({
              message: updateErr,
            });
          }
          return res.status(201).send({
            message: 'Portfolio updated!',
            portfolioId: id,
          });
        }
      );
    } else {
      const updateQuery = 'UPDATE portfolio SET name = ?, `desc` = ?, createdAt = now() WHERE id = ?';
      db.query(
        updateQuery,
        [name, desc, id],
        (updateErr, updateResult) => {
          if (updateErr) {
            return res.status(400).send({
              message: updateErr,
            });
          }
          return res.status(201).send({
            message: 'Portfolio updated!',
            portfolioId: id,
          });
        }
      );
    }
  });
};


exports.updateSortingPortfolio = (req, res) => {
  const items = req.body.items;
  const updateQuery = `UPDATE portfolio SET sortedOrder = ? WHERE id = ?`;

  let hasError = false;

  items.forEach((item, index) => {
    db.query(updateQuery, [index, item.id], (err, results) => {
      if (err) {
        hasError = true; // Set the error flag
        console.error('Error updating portfolio:', err);
      }
      if (index === items.length - 1) {
        if (hasError) {
          return res.status(400).send({
            message: 'Error updating portfolio',
          });
        } else {
          return res.status(201).send({
            message: 'Portfolio Sorted!',
          });
        }
      }
    });
  });
};


exports.getPortfolios = async (req, res) => {
  const query = `
    SELECT 
      portfolio.id, 
      portfolio.name, 
      portfolio.desc, 
      portfolio.coverImage, 
      portfolio.createdAt, 
      portfolio_pictures.id AS portfolio_pictures_id, 
      portfolio_pictures.image,
      portfolio_tags.id AS portfolio_tags_id, 
      portfolio_tags.tag
    FROM portfolio 
    LEFT JOIN portfolio_pictures 
    ON portfolio.id = portfolio_pictures.portfolio_image_id
    LEFT JOIN portfolio_tags 
    ON portfolio.id = portfolio_tags.portfolio_tag_id
    ORDER BY portfolio.sortedOrder ASC, portfolio_pictures.sortedOrder ASC;`;

  try {
    db.query(query, async (err, results) => {
      if (err) {
        return res.status(400).send({ message: err });
      }

      const portfolios = [];

      for (const row of results) {
        const {
          id,
          name,
          desc,
          coverImage,
          createdAt,
          portfolio_pictures_id,
          image,
          portfolio_tags_id,
          tag
        } = row;

        let portfolio = portfolios.find((p) => p.id === id);

        if (!portfolio) {
          portfolio = {
            id,
            name,
            desc,
            coverImage,
            createdAt,
            portfolio_pictures: [],
            portfolio_tags: [],
          };

          try {
            const totalSpentTime = await portfolioTimeSpent(id);
            portfolio.totalSpentTime = totalSpentTime;

          } catch (error) {
            console.error('Error fetching total spent time:', error);
          }

          try {
            const totalVisitor = await portfolioVisitors(id);
            portfolio.totalVisitor = totalVisitor;

          } catch (error) {
            console.error('Error fetching total visitor:', error);
          }

          portfolios.push(portfolio);
        }

        if (portfolio_pictures_id && image && !portfolio.portfolio_pictures.some(pic => pic.id === portfolio_pictures_id)) {
          portfolio.portfolio_pictures.push({
            id: portfolio_pictures_id,
            image: image
          });
        }

        if (portfolio_tags_id && tag && !portfolio.portfolio_tags.some(t => t.id === portfolio_tags_id)) {
          portfolio.portfolio_tags.push({
            id: portfolio_tags_id,
            tag: tag
          });
        }
      }

      return res.status(200).json({ portfolios });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


exports.deletePortfolioById = (req, res) => {
  // const portfolioId = req.params.id;
  const { portfolioId } = req.body.portfolioId;
  
  const deletePortfolioIdFromPortfolioVisits = `
  DELETE FROM
    portfolio_visits
  WHERE
    portfolio_id = ? `;
 
  const selectPortfolioImageQuery = `
    SELECT 
      portfolio.id,
      portfolio.coverImage,
      portfolio_pictures.id AS portfolio_pictures_id,
      portfolio_pictures.image 
    FROM portfolio 
    LEFT JOIN portfolio_pictures ON portfolio.id = portfolio_pictures.portfolio_image_id 
    WHERE portfolio.id = ?`;

  const deletePortfolioQuery = `
    DELETE FROM 
      portfolio_pictures 
    WHERE 
      portfolio_image_id = ?`;

  const deletePortfolioTagsQuery = `
    DELETE FROM 
      portfolio_tags 
    WHERE 
      portfolio_tag_id = ?`;

  const deleteQuery = `
    DELETE FROM 
      portfolio
    WHERE 
      id = ?`;
    
  if (portfolioId) {
    db.query(selectPortfolioImageQuery, [portfolioId], (err, results) => {

      const portfolios = [];

      results.forEach((row) => {
        const existingProject = portfolios.find((p) => p.id === row.id);
  
        if (existingProject) {
          existingProject.portfolio_pictures.push({ 
              id: row.portfolio_pictures_id, 
              image: row.image 
            });
        } else {
          portfolios.push({
            id: row.id,
            coverImage: row.coverImage,
            portfolio_pictures: row.portfolio_pictures_id ? [{ 
              id: row.portfolio_pictures_id, 
              image: row.image 
            }] : [],
          });
        }
      });
      
      // console.log(JSON.stringify(portfolios, null, 2));

      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while retrieving data' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Portfolio item not found' });
        return;
      }
      const imagePath = portfolios[0].coverImage;
      const imagesPath = portfolios[0].portfolio_pictures;

      db.query(deletePortfolioTagsQuery, [portfolioId], (err, result) => {
        if (err) {
          res.status(400).send({ message: err });
          connection.rollback(() => {
            res.status(500).json({ error: 'An error occurred while deleting child data' });
          });
          return;
        }

        db.query(deletePortfolioQuery, [portfolioId], (err, result) => {
          if (err) {
            res.status(400).send({ message: err });
            connection.rollback(() => {
              res.status(500).json({ error: 'An error occurred while deleting child data' });
            });
            return;
          }

          db.query(deletePortfolioIdFromPortfolioVisits, [portfolioId], (err,result)=>{

            if (err) {
              res.status(400).send({ message: err });
              connection.rollback(() => {
                res.status(500).json({ error: 'An error occurred while deleting child data' });
              });
              return;
            }
              db.query(deleteQuery, [portfolioId], (err, result) => {
              if (err) {
                res.status(400).send({ message: err });
                connection.rollback(() => {
                  res.status(500).json({ error: 'An error occurred while deleting portfolio data' });
                });
                return;
              }

            db.commit((err) => {
              if (err) {
                res.status(400).send({ message: err });
                connection.rollback(() => {
                  res.status(500).json({ error: 'An error occurred while committing transaction' });
                });
                return;
              }
              return res.status(200).send({
                message: 'Portfolio delete successfully!',
              });
            });

            if (imagePath) {
              const coverImagePathToDelete = path.join(__dirname, "../uploads", imagePath);
              fs.unlink(coverImagePathToDelete, (err) => {
                if (err) {
                  res.status(400).send({ message: "Cover image is not deleting from local storage" });
                }
              });
            }
      
            imagesPath.forEach((row) => {
              const imageToDelete = row.image;
              const imagePathToDelete = path.join(__dirname, "../uploads", imageToDelete);
        
              fs.unlink(imagePathToDelete, (err) => {
                if (err) {
                  res.status(400).send({ message: "Porfolio images is not deleting from local storage" });
                }
              });
            });
          });
            
          })

          
        });
      });
    });
  } else {
    res.status(400).json({ error: "Invalid Portfolio" });
  }
};
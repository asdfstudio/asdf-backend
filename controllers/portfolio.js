const db = require('../lib/db.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

exports.createPortfolio = (req, res) => {
  const { name, desc } = req.body;
  const coverImage = req.file.filename;
  const portfolioId = uuid.v4();
  db.query(
    'INSERT INTO portfolio (id, name, `desc`, `coverImage`, createdAt) VALUES (?, ?, ?, ?, now());',
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

exports.getPortfolios = (req, res) => {
  
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
    ON portfolio.id = portfolio_tags.portfolio_tag_id`;
    
  // const query = 'SELECT * FROM portfolio';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).send({
        message: err,
      });
    }

    const portfolios = [];

    results.forEach((row) => {
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
          portfolio_tags: []
        };
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
    });
      return res.status(200).json({ portfolios });


      // return res.status(200).send({
      //   message: 'Portfolio delete successfully!',
      // });
  });
};

exports.deletePortfolioById = (req, res) => {
  // const portfolioId = req.params.id;
  const { portfolioId } = req.body.payload;
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

      // console.log("portfolioIdddddddd", portfolioId);

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
        });
      });
    });
  } else {
    res.status(400).json({ error: "Invalid Portfolio" });
  }
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.updateQuantity = (req, res) => {

  // req.body.map((item) => {
  //   console.log(item.totalQuantity);

  //   Product.findByIdAndUpdate(
  //     {
  //       _id: item.productId
  //     },
  //     { "quantity": item.totalQuantity },
      
  //     function (err, result) {
  //       if (err) {
  //         res.send(err)
  //       }
  //       else {
  //         res.send(result)
  //       }
  //     })
  // });

  // console.log(req.body.totalQuantity);
  Product.updateOne(
    {
      _id: req.body.productId
    },
    { "quantity": req.body.totalQuantity }, 
    function(err, result){
      if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }
    })
};

exports.getAllProducts = (req, res) => {

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  let term = req.body.searchTerm;
  for (let key in req.body.filters) {

    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      }
      else if (key === "continents") {
        term = req.body.filters[key];
        console.log(term)
      }
      else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {

    var regex = new RegExp(req.body.searchTerm, 'i');
    Product.find({ name: regex })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, products, postSize: products.length })
        //console.log(products)
      })
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, products, postSize: products.length })
      })
  }

};
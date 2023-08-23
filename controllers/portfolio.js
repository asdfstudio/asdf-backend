const db = require('../lib/db.js');
const uuid = require('uuid');


exports.createPortfolio = (req, res) => {
  const { name, desc } = req.body;
  const coverImage = req.file.filename;
  db.query(
    'INSERT INTO portfolio (id, name, `desc`, `coverImage`, createdAt) VALUES (?, ?, ?, ?, now());',
      [uuid.v4(), name, desc, coverImage],
      (err, result) => {
      if (err) {
          return res.status(400).send({
          message: err,
          });
      }
      return res.status(201).send({
          message: 'Portfolio Added!',
      });
      }
  );
};

exports.createPortfolioImages = (req, res) => {
  const files = req.files;
  const portfolioId = req.body.portfolio_image_id

  files.forEach(file => {
    const filename = file.filename;

    const query = 'INSERT INTO portfolio_pictures (id, `portfolio_image_id`, `images`) VALUES (?, ?, ?)';
    db.query(query, [uuid.v4(), portfolioId, filename], (err, result) => {
      if (err) {
         res.status(400).send({
          message: err,
        });
      }
    });
  });
  res.status(201).send({
    message: 'Portfolio Added!',
});
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

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product
    .find({ createdBy: req.user._id })
    .select("_id name price brand type quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
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
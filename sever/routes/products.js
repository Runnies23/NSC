const router = require('express').Router();
let Product = require('../models/product.model');

// Route to add a new product
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const description = req.body.description;

  const newProduct = new Product({
    name,
    price,
    description,
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to get all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

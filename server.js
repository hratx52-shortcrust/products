const express = require('express');
const db = require('./database.js');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/products', (req, res) => {
  /*
    The stuff after a ? in a URL are called 'parameters'
    but express uses the word 'params' to refer to the stuff after a ':', for example:
    /products/:product_id
    so that a user can perform a GET on /products/3
    which sets req.params.product_id = 3
    The stuff after '?', e.g. /products?page=2&results=5
    is referred to by express as 'query'
    From the above example, this would set req.query.page = 2; and req.query.results = 5
  */
  db.getProducts(req.query.page, req.query.results)
    .then( products => {
      res.send(products);
    })
    .catch( err => {
      console.log('Error when sending query for products:', err);
      res.status(500).send(err);
    });
});

app.get('/products/:product_id', (req, res) => {
  db.getProduct(req.params.product_id)
    .then( product => {
      res.send(product);
    })
    .catch( err => {
      console.log('Error when sending query for product with id ' + req.params.product_id + ':', err);
      res.status(500).send(err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send(`Will return styles for product ${req.params.product_id}`);
});

app.get('/products/:product_id/related', (req, res) => {
  res.send(`Will items realted to product ${req.params.product_id}`);
});
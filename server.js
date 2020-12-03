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
  res.send(`Will return information about product ${req.params.product_id}`);
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send(`Will return styles for product ${req.params.product_id}`);
});

app.get('/products/:product_id/related', (req, res) => {
  res.send(`Will items realted to product ${req.params.product_id}`);
});
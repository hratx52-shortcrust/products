const express = require('express');
const db = require('../database.js');
var cors = require('cors')

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello, world');
})

app.get('/products', (req, res) => {
  console.log('Handling GET request at /products');
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
  db.getProducts(req.query.page, req.query.results) // TODO: isn't this parameter called 'count', not 'results'?
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      console.log('Error when sending query for products:', err);
      res.status(500).send(err);
    });
});

app.get('/products/:product_id', (req, res) => {
  console.log('Handling GET request at /products/:product_id', req.params.product_id);
  db.getProduct(req.params.product_id)
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      console.log('Error when sending query for product with id ' + req.params.product_id + ':', err);
      res.status(500).send(err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  console.log('Handling GET request at /products/:product_id/styles', req.params.product_id);
  db.getStyles(req.params.product_id)
    .then(styles => {
      res.send(styles);
    })
    .catch(err => {
      console.log('Error when sending query for styles with product id ' + req.params.product_id + ':', err);
      res.status(500).send(err);
    })
});

app.get('/products/:product_id/related', (req, res) => {
  console.log('Handling GET request at /products/:product_id/related', req.params.product_id);
  db.getRelatedProducts(req.params.product_id)
    .then(relatedProducts => {
      res.send(relatedProducts);
    })
    .catch(err => {
      console.log('Error when sending query for relatedProducts with id ' + req.params.product_id + ':', err);
      res.status(500).send(err);
    });
});

module.exports = app;
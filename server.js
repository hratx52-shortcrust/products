const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/products', (req, res) => {
  res.send('Will return a list of products');
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
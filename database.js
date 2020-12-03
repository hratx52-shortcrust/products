const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'hello123',
  database: 'SDC',
});

client.connect();

const getProducts = async function(page = 1, count = 5) {
  if (page < 1) {
    return Promise.reject(new Error('Page must be greater than 0'));
  }
  if (count < 1) {
    return Promise.reject(new Error('Count must be greater than 0'));
  }

  // The original API used the column name "id", rather than "product_id"
  // so we will rename that column here
  const text = `
    SELECT
      product_id AS id,
      name,
      slogan,
      description,
      category,
      default_price
    FROM products
    LIMIT $1
    OFFSET $2;
  `;

  // first value is LIMIT
  // second value is OFFSET
  const values = [count, count*(page - 1)];

  const products = await client.query(text, values);
  return products.rows;
};

const getProduct = async function(id) {
  let text = `
    SELECT
      product_id AS id,
      name,
      slogan,
      description,
      category,
      default_price
    FROM products
    WHERE product_id=$1;
  `;

  let values = [id];

  const res = await client.query(text, values);
  let itemInfo = res.rows[0];

  // TODO: can we send the second query without having to wait for the first one to finish?
  text = `
    SELECT
      feature_name AS feature,
      feature_value AS value
    FROM product_features
    WHERE product_id=$1;
  `
  const features = await client.query(text, values);
  itemInfo['features'] = features.rows;
  return itemInfo;
};

module.exports = { getProducts, getProduct };
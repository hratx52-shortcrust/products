const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'hello123',
  database: 'SDC',
});

client.connect();

const getProducts = async function(page = 1, count = 5)  {

  // The original API used the column name "id", rather than "product_id"
  // so we will rename that column here
  const q = `
    SELECT
      product_id AS id,
      name,
      slogan,
      description,
      category,
      default_price
    FROM products
    LIMIT 5
    OFFSET 0;
  `;
  const res = await client.query(q);
  return res.rows;
};

module.exports = { getProducts };
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

const getStyles = async function(id) {
  // Typecast 'true' 'false' to '1' '0'
  // default_style::INT
  let text = `
    SELECT
      default_style::INT as "default?",
      name,
      original_price,
      sale_price,
      style_id
    FROM product_styles
    WHERE product_id=$1;
  `;

  let values = [id];

  var res = await client.query(text, values);
  let styleInfo = {product_id: id}
  styleInfo.results = res.rows;
  let photoPromises = [];
  for(style of styleInfo.results) {
    text = `
      SELECT thumbnail_url, url
      FROM product_style_photos
      WHERE style_id=$1;
    `;
    values=[style.style_id];
    console.log(style.style_id);
    photoPromises.push(client.query(text, values));
  }
  console.log(photoPromises);
  let resArray = await (Promise.all(photoPromises));

  // We now have 2 arrays: styleInfo.results and resArray
  // each entry of styleInfo.results is an object
  // we need to add a new key to each obejct in the styleInfo.results array:
  // key: photos, with array value: [{thumbnail_url: 'example.com/thumbnail', url:'example.com/photo'},{...}]
  for(index in styleInfo.results) {
    styleInfo.results[index].photos = resArray[index].rows;
  }
  return styleInfo;
}

module.exports = { getProducts, getProduct, getStyles };
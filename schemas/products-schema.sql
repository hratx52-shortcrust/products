-- sudo -u postgres psql -d SDC < products-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price DECIMAL
);

COPY products(product_id, name, slogan, description, category, default_price)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/product-fixed.csv'
DELIMITER ','
CSV HEADER;
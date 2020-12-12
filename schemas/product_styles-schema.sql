-- sudo -u postgres psql -d SDC < product_styles-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS product_styles;

CREATE TABLE product_styles (
  style_id INT NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT,
  sale_price DECIMAL,
  original_price DECIMAL,
  default_style BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

COPY product_styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/styles.csv'
DELIMITER ','
NULL 'null'
CSV HEADER;

CREATE INDEX styles_product_id_index ON product_styles (product_id);
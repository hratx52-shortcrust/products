-- sudo -u postgres psql -d SDC < related_products-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS related_products;

CREATE TABLE related_products (
  id INT NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY (current_product_id) REFERENCES products(product_id)
);

COPY related_products(id, current_product_id, related_product_id)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/related.csv'
DELIMITER ','
NULL 'null'
CSV HEADER;

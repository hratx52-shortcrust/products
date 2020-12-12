-- sudo -u postgres psql -d SDC < product_style_skus-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS product_style_skus;

CREATE TABLE product_style_skus (
  sku_id SERIAL NOT NULL PRIMARY KEY,
  style_id INT NOT NULL,
  size TEXT,
  quantity INT,
  FOREIGN KEY (style_id) REFERENCES product_styles(style_id)
);

COPY product_style_skus(sku_id, style_id, size, quantity)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX skus_style_id_index ON product_style_skus (style_id);
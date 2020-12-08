-- sudo -u postgres psql -d SDC < product_features-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS product_features;

CREATE TABLE product_features (
  feature_id INT NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  feature_name TEXT,
  feature_value TEXT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

COPY product_features(feature_id, product_id, feature_name, feature_value)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/features.csv'
DELIMITER ','
CSV;
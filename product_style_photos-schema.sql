-- sudo -u postgres psql -d SDC < product_style_photos-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS product_style_photos;

-- The problem with this csv is that the id column cannot be trusted
-- there is a duplicate key
-- ERROR:  duplicate key value violates unique constraint "product_style_photos_pkey"
-- DETAIL:  Key (photo_id)=(357) already exists.
-- so we make a dummn column, photo_id_from_csv, and delete it after the copy command

CREATE TABLE product_style_photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  photo_id_from_csv INT,
  style_id INT NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY (style_id) REFERENCES product_styles(style_id)
);

COPY product_style_photos(photo_id_from_csv, style_id, url, thumbnail_url)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/photos.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE product_style_photos DROP COLUMN photo_id_from_csv;
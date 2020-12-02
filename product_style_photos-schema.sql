-- sudo -u postgres psql -d SDC < product_style_photos-schema.sql

-- switch to SDC database
\c SDC;

DROP TABLE IF EXISTS product_style_photos;

CREATE TABLE product_style_photos (
  photo_id INT NOT NULL PRIMARY KEY,
  style_id INT NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY (style_id) REFERENCES product_styles(style_id)
);

COPY product_style_photos(photo_id, style_id, url, thumbnail_url)
FROM '/home/jesse/Code/hratx52/SDC/SDC Application Data - Atelier Project/photos.csv'
DELIMITER ','
CSV HEADER;
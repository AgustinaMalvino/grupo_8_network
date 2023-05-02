CREATE DATABASE network;

USE network;

-- TABLA USUARIOS, AQUÍ SE DEFINEN LAS COLUMNAS DE LA TABLA Y LOS USUARIOS EN LA BASE DE DATOS

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL,
  DNI INT(10) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  address VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  password VARCHAR(100) NOT NULL,
  notifications BOOLEAN NOT NULL,
  image VARCHAR(100),
  role VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email),
  UNIQUE KEY DNI_UNIQUE (DNI)
) AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, first_name, last_name, email, DNI, gender, address, birth_date, password, notifications, image, role) 
  VALUES (1, 'Administrador', 'Sistema', 'admin@network.com', 39829128, 'Masculino', 'Capital Federal', '2023-05-02', '$2a$10$IbNZy28TZicBdBCo0BfzKOdmiHHWZCN5NVMoxno9Up3NCwYnIgvse', true, '1679273923004_img.jpg', 'admin');

SELECT * FROM users;

-- TABLA PRODUCTOS, AQUÍ SE GUARDAN LOS SERVICIOS, PRODUCTOS, APLICACIONES Y PAQUETES DE LA EMPRESA

CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(100) NOT NULL,
  price INT(11) NOT NULL,
  offer BOOLEAN NOT NULL,
  discount INT(3),
  tags TEXT,
  categoryId int(11) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=13;

INSERT INTO products (id, name, description, image, price, offer, discount, tags, categoryId) VALUES (1,'Cable clásico', '64 canales; Incluye 1 decodificador gratis; Ideal para hogares de familia.', 'tv.svg', 1499, true, 10, 'cable, television, programas, entretenimiento, calidad normal, canales de aire', 1), (2,'Cable HD', '96 canales; 32 señales en HD; Igual que el servicio clásico y mucho más.', 'tv_oro.svg', 1999, true, 15, 'cable, television, programas, entretenimiento, excelente calidad, canales de aire, deportes', 1), (3,'50 MB', 'Ideal para el usuario estandar; Idóneo para home office.', 'globe_bronce.svg', 1499, true, 9, 'internet, economico, barato', 2), (4,'100 MB', 'Ideal para servicios de streaming; Recomendado para varios usuario.', 'globe.svg', 2199, true, 10, 'internet, medio, varios usuarios', 2), (5,'300 MB', 'Ideal para el gaming; Perfecto para múltiples dispositivos.', 'globe_oro.svg', 2799, true, 13, 'internet, la mejor internet, velocidad', 2), (6,'Paramount Plus', '3 meses gratis para nuevos clientes; Precio final: $599/mes.', 'Paramount_logo.svg', 599, false, 0, 'series, peliculas, dibujos, dibujitos, anime, bob esponja', 3), (7,'Star+', '3 meses gratis para nuevos clientes; Incluye Disney+; Precio final: $499/mes.', 'Star+_logo.svg', 499, false, 0, 'series, peliculas, dibujos, dibujitos, los simpsons', 3), (8,'Disney+', '3 meses gratis para nuevos clientes; Incluye Star+; Precio final: $499/mes.', 'Disney+_logo.svg', 499, false, 0, 'series, peliculas, dibujos, dibujitos, superheroes, marvel, star wars, deportes', 3), (9,'HBO MAX', '3 meses gratis para nuevos clientes; 3 meses más con 50% de descuento; Precio final: $799/mes.', 'HBO_Max_logo.svg', 799, false, 0, 'series, peliculas, dibujos, dibujitos, cartoon network', 3), (10,'Netflix', 'Series y películas en una sola app; Precio final: $1599/mes.', 'Netflix_icon.svg', 1599, false, 0, 'series, peliculas, dibujos, dibujitos, anime', 4), (11,'YouTube', 'Mirá videos sin anuncios; Precio final: $1099/mes.', 'YouTube_icon.svg', 1099, false, 0, 'series, peliculas, videos, sin anuncios', 4), (12,'Spotify', 'Armá tu playlist musical con esta app; Precio final: $399/mes.', 'Spotify_icon.svg', 399, false, 0, 'musica, playlists, sin anuncios', 4);

-- TABLA CATEGORIAS

CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=5;

INSERT INTO categories VALUES (1,'Cable'), (2,'Internet'), (3,'Paquetes'), (4,'Aplicaciones');
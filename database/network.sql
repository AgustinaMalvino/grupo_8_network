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
  discount INT(2),
  categoryId int(11) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=13;

INSERT INTO products (id, name, description, image, price, offer, discount, categoryId) VALUES (1,'Cable clásico', '<li>64 canales</li><li>Incluye 1 decodificador gratis</li><li>Ideal para hogares de familia.</li>', 'tv.svg', 1499, true, 10, 1), (2,'Cable HD', '<li>96 canales</li><li>32 señales en HD</li><li>Igual que el servicio clásico y mucho más.</li>', 'tv_oro.svg', 1999, true, 15, 1), (3,'50 MB', '<li>Ideal para el usuario estandar</li><li>Idóneo para home office.</li>', 'globe_bronce.svg', 1499, true, 9, 2), (4,'100 MB', '<li>Ideal para servicios de streaming</li><li>Recomendado para varios usuario.</li>', 'globe.svg', 2199, true, 10, 2), (5,'300 MB', '<li>Ideal para el gaming</li><li>Perfecto para múltiples dispositivos.</li>', 'globe_oro.svg', 2799, true, 13, 2), (6,'Paramount Plus', '<li>3 meses gratis para nuevos clientes</li><li>Precio final: $599/mes.</li>', 'Paramount_logo.svg', 599, false, 0, 3), (7,'Star+', '<li>3 meses gratis para nuevos clientes</li><li>Incluye Disney+</li><li>Precio final: $499/mes.</li>', 'Star+_logo.svg', 499, false, 0, 3), (8,'Disney+', '<li>3 meses gratis para nuevos clientes</li><li>Incluye Star+</li><li>Precio final: $499/mes.</li>', 'Disney+_logo.svg', 499, false, 0, 3), (9,'HBO MAX', '<li>3 meses gratis para nuevos clientes</li><li>3 meses más con 50% de descuento</li><li>Precio final: $799/mes.</li>', 'HBO_Max_logo.svg', 799, false, 0, 3), (10,'Netflix', '<li>Series y películas en una sola app</li><li>Precio final: $1599/mes.</li>', 'Netflix_icon.svg', 1599, false, 0, 4), (11,'YouTube', '<li>Mirá videos sin anuncios</li><li>Precio final: $1099/mes.</li>', 'YouTube_icon.svg', 1099, false, 0, 4), (12,'Spotify', '<li>Armá tu playlist musical con esta app</li><li>Precio final: $399/mes.</li>', 'Spotify_icon.svg', 399, false, 0, 4);

-- TABLA CATEGORIAS

CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=5;

INSERT INTO categories VALUES (1,'Cable'), (2,'Internet'), (3,'Paquetes'), (4,'Aplicaciones');
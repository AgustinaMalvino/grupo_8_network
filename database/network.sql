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
  password VARCHAR(100) NOT NULL,
  notifications BOOLEAN NOT NULL,
  image VARCHAR(100),
  role VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, first_name, last_name, email, DNI, gender, password, notifications, image, role) 
  VALUES (1, 'Administrador', 'Sistema', 'admin@network.com', 39829128, 'Masculino', '$2a$10$IbNZy28TZicBdBCo0BfzKOdmiHHWZCN5NVMoxno9Up3NCwYnIgvse', true, '1679273923004_img.jpg', 'admin');


SELECT * FROM users;

-- TABLA PRODUCTOS, AQUÍ SE GUARDAN LOS SERVICIOS, PRODUCTOS, APLICACIONES Y PAQUETES DE LA EMPRESA

CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  user_id INT(11),
  image VARCHAR(100) NOT NULL,
  price INT(11) NOT NULL,
  offer BOOLEAN NOT NULL,
  discount INT(2),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  PRIMARY KEY (id)
) AUTO_INCREMENT=2;
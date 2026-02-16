-- Script de Base de Datos para Ferretería
-- Creado para el prototipo de sistema de ventas

CREATE DATABASE IF NOT EXISTS ferreteria_db;
USE ferreteria_db;

-- Tabla de Productos
-- Campos solicitados: id producto, nombre, unidad de medida, precio de venta, estoy (stock), estado.
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    unidad_medida VARCHAR(50) NOT NULL COMMENT 'Ej: Unidad, Litro, Metro, Kilo',
    precio_venta DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL COMMENT 'Campo solicitado como "estoy"',
    estado VARCHAR(20) NOT NULL DEFAULT 'Activo' COMMENT 'Ej: Activo, Descontinuado'
);

-- Datos de prueba para verificar el prototipo
INSERT INTO productos (nombre, unidad_medida, precio_venta, stock, estado) VALUES 
('Martillo de uña', 'Unidad', 15.50, 50, 'Activo'),
('Destornillador Phillips', 'Unidad', 5.00, 100, 'Activo'),
('Cemento Sol 50kg', 'Bolsa', 28.00, 200, 'Activo'),
('Clavos de 2 pulgadas', 'Kilo', 4.50, 500, 'Activo'),
('Pintura Blanca Interiores', 'Galón', 35.00, 30, 'Activo');

-- Selección para verificar datos
SELECT * FROM productos;

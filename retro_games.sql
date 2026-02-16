-- Script de Base de Datos para Tienda de Videojuegos Retro (RetroNexus)
-- Tema: Videojuegos y Consolas Retro

CREATE DATABASE IF NOT EXISTS retro_games_db;
USE retro_games_db;

-- Tabla: productos
-- Campos: id_producto (Auto), nombre, unidad_medida (Plataforma), precio_venta, stock, estado (Condición).
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL COMMENT 'Título del Juego o Nombre de Consola',
    unidad_medida VARCHAR(50) NOT NULL COMMENT 'Plataforma/Formato (ej: N64, PS1, Físico)',
    precio_venta DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL COMMENT 'Cantidad Disponible',
    estado VARCHAR(20) NOT NULL DEFAULT 'Activo' COMMENT 'Condición (ej: Sellado, Completo, Suelto)'
);

-- Datos de prueba para verificación retro
INSERT INTO productos (nombre, unidad_medida, precio_venta, stock, estado) VALUES 
('Super Mario 64', 'Nintendo 64', 45.00, 12, 'Completo'),
('Consola PlayStation 1', 'Hardware', 85.50, 5, 'Restaurado'),
('The Legend of Zelda: Ocarina of Time', 'Nintendo 64', 55.00, 8, 'Suelto'),
('Final Fantasy VII', 'PlayStation 1', 60.00, 15, 'Etiqueta Negra'),
('Sonic the Hedgehog 2', 'Sega Genesis', 25.00, 20, 'En Caja'),
('Game Boy Color (Morado Atómico)', 'Hardware', 70.00, 3, 'Usado - Bueno');

SELECT * FROM productos;

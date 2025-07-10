-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2025 at 08:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tpfinalprogra3`
--
CREATE DATABASE IF NOT EXISTS `tpfinalprogra3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tpfinalprogra3`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasenia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id_admin`, `correo`, `contrasenia`) VALUES
(1, 'profesxabikevin@gmail.com', 'profes131');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
CREATE TABLE `detalle_venta` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `precio` int(11) NOT NULL,
  `url_imagen` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `categoria`, `precio`, `url_imagen`, `activo`) VALUES
(1, 'Abrochadora', 'Utiles', 150, 'https://i.postimg.cc/SNVydH0K/abrochadora.png', 1),
(2, 'A cuatro vientos 1', 'Libros', 1200, 'https://i.postimg.cc/fL4ZkNd8/a-Cuatro-Vientos1.jpg', 1),
(3, 'Asesinato en el orient express', 'Libros', 2500, 'https://i.postimg.cc/Vk6zV41W/asesinato-Orient-Express.jpg', 1),
(4, 'Bibliorato', 'Utiles', 330, 'https://i.postimg.cc/mg5TfMgf/bibliorato.png', 1),
(5, 'Carpeta N3', 'Utiles', 250, 'https://i.postimg.cc/R0J4MFW3/carpeta-N3.png', 1),
(6, 'Carpeta N5', 'Utiles', 280, 'https://i.postimg.cc/sXpzhN9s/carpeta-N5.png', 1),
(7, 'Cartuchera Harry Potter', 'Utiles', 500, 'https://i.postimg.cc/MHqSbmdR/cartuchera-Harry-Potter.png', 1),
(8, 'Cartuchera Hot Wheels', 'Utiles', 480, 'https://i.postimg.cc/rsjLhRPH/cartuchera-Hot-Wheels.png', 1),
(9, 'Cartuchera Racing', 'Utiles', 420, 'https://i.postimg.cc/XNk3NtYg/cartuchera-Racing.png', 1),
(10, 'Cartuchera River Plate', 'Utiles', 350, 'https://i.postimg.cc/HsWmr3J1/cartuchera-River-Plate.png', 1),
(11, 'Cartuchera San Lorenzo', 'Utiles', 350, 'https://i.postimg.cc/c4DSwYYg/cartuchera-San-Lorenzo.png', 1),
(12, 'Cartuchera Standard', 'Utiles', 300, 'https://i.postimg.cc/rwKLJmCh/cartuchera-Standard.png', 1),
(13, 'Ciencias Naturales 1', 'Libros', 1450, 'https://i.postimg.cc/R0t5kDYK/ciencias-Naturales1.jpg', 1),
(14, 'Cinta Papel', 'Utiles', 100, 'https://i.postimg.cc/nhgfwJ3n/cinta-Papel.png', 1),
(15, 'Clips', 'Utiles', 50, 'https://i.postimg.cc/cHNy0cqj/clips.png', 1),
(16, 'Como agua para chocolate', 'Libros', 2200, 'https://i.postimg.cc/nzY8zQpL/como-Agua-Para-Chocolate.jpg', 1),
(17, 'CompÃ¡s', 'Utiles', 170, 'https://i.postimg.cc/D029bywP/compas.png', 1),
(18, 'Crayones', 'Utiles', 110, 'https://i.postimg.cc/4xZ97D6N/crayones.png', 1),
(19, 'Cuaderno A4', 'Utiles', 500, 'https://i.postimg.cc/L6jPs9Zb/cuaderno-A4.png', 1),
(20, 'Cuaderno N3', 'Utiles', 130, 'https://i.postimg.cc/447trb4Z/cuaderno-N3.png', 1),
(21, 'Cuentos Encantados', 'Libros', 1900, 'https://i.postimg.cc/7PF7DGbz/cuentos-Encantados.jpg', 1),
(22, 'Escuadra', 'Utiles', 110, 'https://i.postimg.cc/Hk27Q6z0/escuadra.png', 1),
(23, 'Fahrenheit 451', 'Libros', 3900, 'https://i.postimg.cc/wBjRFD4C/fahrenheit451.png', 1),
(24, 'Fibrones Sharpie', 'Utiles', 600, 'https://i.postimg.cc/B68Lf40N/fibrones-Sharpie.png', 1),
(25, 'Ganchito', 'Utiles', 50, 'https://i.postimg.cc/Bv7LztdX/ganchito.png', 1),
(26, 'Geografia 4to', 'Libros', 4000, 'https://i.postimg.cc/QtRBXwND/geografia-Santillana.jpg', 1),
(27, 'Goma', 'Utiles', 80, 'https://i.postimg.cc/d3rhD6Dy/goma.png', 1),
(28, 'Historia 5to', 'Libros', 4000, 'https://i.postimg.cc/1RqnWmM3/historia-Santillana.jpg', 1),
(29, 'Hojas cuadriculadas', 'Utiles', 650, 'https://i.postimg.cc/bNfGW7FH/hojas-Cuadriculadas-Carpeta.png', 1),
(30, 'Hojas rayadas', 'Utiles', 650, 'https://i.postimg.cc/Jz1s4b8s/hojas-Rayadas-Carpeta.png', 1),
(31, 'Indicador Autoadhesivo', 'Utiles', 700, 'https://i.postimg.cc/DyQWTx9V/indicador-Autoadesivo.png', 1),
(32, 'Lapicera azul', 'Utiles', 100, 'https://i.postimg.cc/Z5VC9CYV/lapicera-Azul.png', 1),
(33, 'Lapicera negra', 'Utiles', 100, 'https://i.postimg.cc/0Njr7Pbx/lapicera-Negra.png', 1),
(34, 'Lapices de colores', 'Utiles', 210, 'https://i.postimg.cc/pdSrZ4Fj/lapices-Colores.png', 1),
(35, 'Lapiz negro', 'Utiles', 110, 'https://i.postimg.cc/hj7j3sL5/lapiz-Negro.png', 1),
(36, 'Liquid paper', 'Utiles', 140, 'https://i.postimg.cc/HnDxGM3s/liquid-Paper.png', 1),
(37, 'Mochila carrito', 'Utiles', 8000, 'https://i.postimg.cc/NF60Q0P8/mochila-Carrito.png', 1),
(38, 'Mochila colgante', 'Utiles', 7500, 'https://i.postimg.cc/Vsnvq7LS/mochila-Colgante.png', 1),
(39, 'Operacion Masacre', 'Libros', 4850, 'https://i.postimg.cc/yYTN5kRs/operacion-Masacre.jpg', 1),
(40, 'Organizador A4', 'Utiles', 830, 'https://i.postimg.cc/28Y624V0/organizador-A4.png', 1),
(41, 'Pack hojas N3 Color', 'Utiles', 580, 'https://i.postimg.cc/P5rqkTbZ/packhojasn3-Color.png', 1),
(42, 'Pack hojas N5 Blancas', 'Utiles', 620, 'https://i.postimg.cc/DwjwvH5N/packhojasn5blancas.png', 1),
(43, 'Pack 3 lapiceras a eleccion', 'Utiles', 130, 'https://i.postimg.cc/Xvr7pLzY/pack-Infaltable.png', 1),
(44, 'Pack lapiceras de color', 'Utiles', 270, 'https://i.postimg.cc/d3YqNYth/pack-Lapicera-Colores.png', 1),
(45, 'Regla', 'Utiles', 90, 'https://i.postimg.cc/7hnqpWfm/regla.png', 1),
(46, 'Repuesto de abrochadora', 'Utiles', 150, 'https://i.postimg.cc/Ss8SGsq0/respuesto-Abrochadora.png', 1),
(47, 'Tijera', 'Utiles', 430, 'https://i.postimg.cc/QMvN572k/tijera.png', 1),
(48, 'Transportador', 'Utiles', 540, 'https://i.postimg.cc/4NXfzsSM/transportador.png', 1),
(49, 'Voligoma', 'Utiles', 290, 'https://i.postimg.cc/c1R1grXw/voligoma.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `nombre_usuario` varchar(150) NOT NULL,
  `fecha` datetime NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `detalle_venta_ibfk_1` (`id_producto`),
  ADD KEY `detalle_venta_ibfk_2` (`id_venta`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

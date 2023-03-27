-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-03-2023 a las 23:31:16
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digitalstore_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'Redragon'),
(2, 'HyperX'),
(3, 'ASUS'),
(4, 'Be Quiet'),
(5, 'GeiL'),
(6, 'Team'),
(7, 'Asrock'),
(8, 'LG'),
(9, 'Samsung'),
(10, 'Deepcool');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `idUser` int(10) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartproduct`
--

CREATE TABLE `cartproduct` (
  `id` int(10) NOT NULL,
  `idCart` int(10) NOT NULL,
  `idProduct` int(10) NOT NULL,
  `historicPrice` int(100) NOT NULL,
  `quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Auriculares'),
(2, 'Gabinetes'),
(3, 'Memorias'),
(4, 'Motherboard'),
(5, 'Teclados'),
(6, 'Monitores'),
(7, 'Tablets'),
(8, 'Coolers');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(100) NOT NULL,
  `idCategory` int(10) NOT NULL,
  `descrption` text DEFAULT NULL,
  `idBrand` int(10) NOT NULL,
  `image` varchar(255) NOT NULL,
  `discount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `idCategory`, `descrption`, `idBrand`, `image`, `discount`) VALUES
(1, 'Auriculares Redragon H120 Ares PC', 3850, 1, 'Este es un auricular para PC', 1, 'auriculares-redragon.jpg', 0),
(2, 'Auriculares HyperX Cloud Flight Black Wireless', 25150, 1, 'Este es un auricular para PC', 2, 'auriculareshyperx.jpg', 15),
(3, 'Gabinete ASUS ROG STRIX GX601 Helios Evangelion Edition ARGB', 138, 2, 'Este es un gabinete ASUS', 3, 'gabinete-asus.jpg', 10),
(4, 'Gabinete Be Quiet! DARK BASE PRO 900 Black Rev 2', 87900, 2, 'Este es un gabinete tradicional', 4, 'gabinete.png', 0),
(5, 'Memoria GeiL DDR4 16GB 3000MHz Super Luce RGB Black', 41500, 3, 'Este es una memoria RAM marca Geil', 5, 'memoria-geil.jpg', 20),
(6, 'Memoria Team DDR4 8GB 3200Mhz T-Force Night Hawk White RGB', 40100, 3, 'Este es una memoria RAM marca Team', 6, 'memoria-team.jpg', 0),
(7, 'Mother Asrock B365M BULK', 7100, 4, 'Este es un motherboard marca Asrock', 7, 'motherasrock.jpg', 0),
(8, 'Teclado Mecanico HP HyperX Alloy Origins 60 Switch RED LA', 16600, 5, 'Este es un teclado inalambrico', 2, 'teclado.png', 10),
(9, 'Teclado Mecanico HP HyperX Alloy Origins 60 Switch RED LA', 16600, 5, 'Este es un teclado inalambrico', 2, 'teclado.png', 10),
(10, 'Mother ASUS ROG STRIX B550-XE Gaming Wifi AM4', 95300, 4, 'Este es un motherboard marca Asus', 3, 'motherBord.jpg', 15),
(11, 'Teclado Redragon Harpe PRO K503 RGB ESP', 5900, 5, 'Este es un teclado Redragon', 1, 'teclado-redragon.jpg', 0),
(12, 'Teclado Mecanico HP HyperX Alloy Origins 60 Switch RED LA', 16600, 5, 'Este es un teclado inalambrico', 2, 'teclado.png', 10),
(13, 'Monitor LG Leg 19\' 19M38A-B VGA', 38700, 6, 'Este es un monitor LG', 8, 'monitorlg.jpg', 10),
(14, 'Monitor Sansung 19\' A330N HDMI', 43240, 6, 'Este es un monitor Sansung', 9, 'monitor_sansung.jpg', 0),
(15, 'Tablet Sansung Galaxy tabA8 wifi Dark Grey SM-X200N', 72960, 7, 'Esta es una tablet A8 Dark', 9, 'tablet2.jpg', 15),
(16, 'Cooler CPU Deepcool UP551 ARGB', 6000, 8, 'Este es un cooler tradicional', 10, 'monitor_sansung.jpg', 0),
(17, 'Cooler CPU Master Hyper 212 ARGB', 16400, 8, 'Este es un cooler premium', 2, 'coolermax.jpg', 15),
(18, 'Tablet Sansung Galaxy tabA7 Lite Silver SM-T220N', 45180, 7, 'Esta es una tablet A7 Lite', 9, 'tablet1.jpg', 0),
(19, 'Tablet Sansung Galaxy tabA8 wifi Dark Grey SM-X200N', 72960, 7, 'Esta es una tablet A8 Dark', 9, 'tablet2.jpg', 15),
(20, 'Redragon H260 HYLAS H260W-RGB', 8850, 1, '¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Redragon H260 HYLAS no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.\\r\\n\\r\\nEl formato perfecto para vos\\r\\nAl ser headset podrás escuchar tu música preferida, mantener llamadas telefónicas y jugar en línea desde tu PC sin perderte ningún detalle.', 1, 'image-1674694480722.jpg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `role` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'Regular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `idRole` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `userName`, `password`, `email`, `img`, `idRole`) VALUES
(1, 'Gilda', 'Daniellot', 'gdaniellot0', 'TUD9TvSkdN', 'gdaniellot0@businessinsider.com', '', 2),
(2, 'Sibel', 'Pinchos', 'sskeeles1', 'oiSErHsssT', 'sskeeles1@blogspot.com', '', 2),
(3, 'Beatriz', 'Boldison', 'bboldison2', '73XbLB0x', 'bboldison2@ifeng.com', '', 2),
(4, 'Chloette', 'Schenfisch', 'cschenfisch3', 'fcnm9jcauy0o', 'cschenfisch3@eepurl.com', '', 2),
(5, 'Saxe', 'Frances', 'sfrances4', 'nzSj3jXbYzFP', 'sfrances4@cisco.com', '', 2),
(6, 'Axel', 'Riera', 'USER', 'PASS', 'axelriera@gmail.com', '', 1),
(7, 'Melina', 'Leonardi', 'melinal', 'melinal', 'melina61285@gmail.com', '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `cartproduct`
--
ALTER TABLE `cartproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCart` (`idCart`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`),
  ADD KEY `idBrand` (`idBrand`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRole` (`idRole`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cartproduct`
--
ALTER TABLE `cartproduct`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `cartproduct`
--
ALTER TABLE `cartproduct`
  ADD CONSTRAINT `cartproduct_ibfk_1` FOREIGN KEY (`idCart`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `cartproduct_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `cart` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`idBrand`) REFERENCES `brand` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

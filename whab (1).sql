SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `candleinventory` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `candleinventory` (`id`, `name`, `amount`, `date`) VALUES
(2, 'big', 0, '2024-03-25'),
(3, 'amen', 0, '2024-03-25'),
(4, 'big', 0, '2024-03-25'),
(5, 'big', 0, '2024-03-26'),
(6, 'big', 0, '2024-03-26'),
(7, 'big', 33, '2024-03-26'),
(8, 'amen', 20, '2024-03-26');
CREATE TABLE `candles` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `amount` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `candles` (`id`, `name`, `amount`) VALUES
(1, 'big', 9.25),
(2, 'amen', 7.20),
(3, 'medium', 6.00),
(4, 'color', 4.00);
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `discription` varchar(10) NOT NULL,
  `bag_number` int(11) NOT NULL,
  `weight` decimal(7,2) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `place` varchar(25) NOT NULL,
  `remark` varchar(25) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `inventory` (`id`, `discription`, `bag_number`, `weight`, `total`, `place`, `remark`, `date`) VALUES
(24, 'waxandoil', 21, 3.00, 0.00, 'sf', 'gg', '2024-03-22'),
(25, 'waxandoil', 2, 3.00, 0.00, '1', '3', '2024-03-24'),
(26, 'waxandoil', 2, 33.00, 0.00, 'ad', 'fff', '2024-03-25'),
(27, 'waxandoil', 2, 3.00, 0.00, 'asf', 'vzx', '2024-03-25'),
(28, 'waxandoil', 2, 4.00, 0.00, 'af', 'asf', '2024-03-25'),
(29, 'waxandoil', 2, 2.00, 0.00, '1', '1', '2024-03-25'),
(30, 'waxandoil', 3, 2.00, 0.00, 'd', 'd', '2024-03-25'),
(31, 'waxandoil', 3, 2.00, 0.00, 'ee', 'e', '2024-03-25'),
(32, 'waxandoil', 2, 3.00, 0.00, 'ava', 'afsaf', '2024-03-25'),
(33, 'waxandoil', 3, 3.00, 0.00, '23', '32', '2024-03-25'),
(34, 'waxandoil', 3, 4.00, 0.00, 'f', 'f', '2024-03-25'),
(35, 'waxandoil', 3, 5.00, 0.00, 'dadad', 'dads', '2024-03-25'),
(36, 'waxandoil', 23, 33.00, 85.00, 'asf', 'wwfafs', '2024-03-26');
CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `candle_type` varchar(10) NOT NULL,
  `amount` int(11) NOT NULL,
  `place` varchar(15) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `sales` (`id`, `candle_type`, `amount`, `place`, `date`) VALUES
(0, 'amen', 0, 'cb', '2024-03-26'),
(0, 'big', 0, 'm', '2024-03-26'),
(0, 'big', 0, '2', '2024-03-26');
ALTER TABLE `candleinventory`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `candles`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `candleinventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `candles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;
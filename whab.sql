-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2024 at 06:41 PM
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
-- Database: `whab`
--

-- --------------------------------------------------------

--
-- Table structure for table `candleinventory`
--

CREATE TABLE `candleinventory` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candleinventory`
--

INSERT INTO `candleinventory` (`id`, `name`, `amount`, `date`) VALUES
(1, 'big', 22, '2024-03-25');

-- --------------------------------------------------------

--
-- Table structure for table `candles`
--

CREATE TABLE `candles` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `amount` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candles`
--

INSERT INTO `candles` (`id`, `name`, `amount`) VALUES
(1, 'big', 9.25),
(2, 'amen', 7.20),
(3, 'medium', 6.00),
(4, 'color', 4.00);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

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

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `discription`, `bag_number`, `weight`, `total`, `place`, `remark`, `date`) VALUES
(24, 'waxandoil', 21, 3.00, 63.00, 'sf', 'gg', '2024-03-22'),
(25, 'waxandoil', 2, 3.00, 6.00, '1', '3', '2024-03-24'),
(26, 'waxandoil', 2, 33.00, 66.00, 'ad', 'fff', '2024-03-25'),
(27, 'waxandoil', 2, 3.00, 6.00, 'asf', 'vzx', '2024-03-25'),
(28, 'waxandoil', 2, 4.00, 8.00, 'af', 'asf', '2024-03-25'),
(29, 'waxandoil', 2, 2.00, 4.00, '1', '1', '2024-03-25'),
(30, 'waxandoil', 3, 2.00, 6.00, 'd', 'd', '2024-03-25'),
(31, 'waxandoil', 3, 2.00, 6.00, 'ee', 'e', '2024-03-25'),
(32, 'waxandoil', 2, 3.00, 6.00, 'ava', 'afsaf', '2024-03-25'),
(33, 'waxandoil', 3, 3.00, 9.00, '23', '32', '2024-03-25'),
(34, 'waxandoil', 3, 4.00, 12.00, 'f', 'f', '2024-03-25');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `candle_type` varchar(10) NOT NULL,
  `amount` decimal(7,3) NOT NULL,
  `total` decimal(8,4) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candleinventory`
--
ALTER TABLE `candleinventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candles`
--
ALTER TABLE `candles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candleinventory`
--
ALTER TABLE `candleinventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candles`
--
ALTER TABLE `candles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

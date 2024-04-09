-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2024 at 09:10 PM
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
(8, 'amen', 17, '2024-03-26'),
(9, 'big', 17, '2024-04-07'),
(10, 'big', 1, '2024-04-08'),
(11, 'amen', 1, '2024-04-08'),
(12, 'medium', 1, '2024-04-08'),
(13, 'color', 1, '2024-04-08'),
(14, 'big', 2, '2024-04-08'),
(15, 'amen', 2, '2024-04-08'),
(16, 'medium', 2, '2024-04-08'),
(17, 'color', 2, '2024-04-08'),
(18, 'amen', 5, '2024-04-08'),
(19, 'big', 3, '2024-04-08');

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
(36, 'waxandoil', 23, 33.00, 169.05, 'asf', 'wwfafs', '2024-03-26'),
(37, 'waxandoil', 1, 2.00, 2.00, 'ad', 's', '2024-04-08'),
(38, 'waxandoil', 3, 50.00, 150.00, 'bole', 'added wax from bole', '2024-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `candle_type` varchar(10) NOT NULL,
  `amount` int(11) NOT NULL,
  `place` varchar(15) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `candle_type`, `amount`, `place`, `date`) VALUES
(29, 'amen', 3, 'sdg', '2024-04-08'),
(30, 'big', 4, 'soled to abebe', '2024-04-08');

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
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candleinventory`
--
ALTER TABLE `candleinventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `candles`
--
ALTER TABLE `candles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

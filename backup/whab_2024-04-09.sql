-- mysqldump-php https://github.com/ifsnop/mysqldump-php
--
-- Host: localhost	Database: whab
-- ------------------------------------------------------
-- Server version 	10.4.32-MariaDB
-- Date: Tue, 09 Apr 2024 22:27:59 +0200

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40101 SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candleinventory`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candleinventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candleinventory`
--

LOCK TABLES `candleinventory` WRITE;
/*!40000 ALTER TABLE `candleinventory` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `candleinventory` VALUES (8,'amen',17,'2024-03-26'),(9,'big',17,'2024-04-07'),(10,'big',1,'2024-04-08'),(11,'amen',1,'2024-04-08'),(12,'medium',1,'2024-04-08'),(13,'color',1,'2024-04-08'),(14,'big',2,'2024-04-08'),(15,'amen',2,'2024-04-08'),(16,'medium',2,'2024-04-08'),(17,'color',2,'2024-04-08'),(18,'amen',5,'2024-04-08'),(19,'big',3,'2024-04-08');
/*!40000 ALTER TABLE `candleinventory` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

-- Dumped table `candleinventory` with 12 row(s)
--

--
-- Table structure for table `candles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `amount` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candles`
--

LOCK TABLES `candles` WRITE;
/*!40000 ALTER TABLE `candles` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `candles` VALUES (1,'big',9.25),(2,'amen',7.20),(3,'medium',6.00),(4,'color',4.00);
/*!40000 ALTER TABLE `candles` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

-- Dumped table `candles` with 4 row(s)
--

--
-- Table structure for table `inventory`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discription` varchar(10) NOT NULL,
  `bag_number` int(11) NOT NULL,
  `weight` decimal(7,2) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `place` varchar(25) NOT NULL,
  `remark` varchar(25) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `inventory` VALUES (36,'waxandoil',23,33.00,169.05,'asf','wwfafs','2024-03-26'),(37,'waxandoil',1,2.00,2.00,'ad','s','2024-04-08'),(38,'waxandoil',3,50.00,150.00,'bole','added wax from bole','2024-04-08');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

-- Dumped table `inventory` with 3 row(s)
--

--
-- Table structure for table `sales`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candle_type` varchar(10) NOT NULL,
  `amount` int(11) NOT NULL,
  `place` varchar(15) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `sales` VALUES (29,'amen',3,'sdg','2024-04-08'),(30,'big',4,'soled to abebe','2024-04-08');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

-- Dumped table `sales` with 2 row(s)
--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET AUTOCOMMIT=@OLD_AUTOCOMMIT */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on: Tue, 09 Apr 2024 22:27:59 +0200

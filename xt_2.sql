-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: xt
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `daytime`
--

DROP TABLE IF EXISTS `daytime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daytime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dayTime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daytime`
--

LOCK TABLES `daytime` WRITE;
/*!40000 ALTER TABLE `daytime` DISABLE KEYS */;
INSERT INTO `daytime` VALUES (1,'BREAKFASTS'),(2,'LUNCHES'),(3,'DINNERS'),(7,'SNACKS');
/*!40000 ALTER TABLE `daytime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diet`
--

DROP TABLE IF EXISTS `diet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet`
--

LOCK TABLES `diet` WRITE;
/*!40000 ALTER TABLE `diet` DISABLE KEYS */;
INSERT INTO `diet` VALUES (1,'Cereal with milk and berries'),(2,'Scrambled egg wrap'),(3,'Veggie omelet'),(5,'Test');
/*!40000 ALTER TABLE `diet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dietplan`
--

DROP TABLE IF EXISTS `dietplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dietplan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `week` int DEFAULT NULL,
  `daytime` int DEFAULT NULL,
  `diet` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `week` (`week`),
  KEY `daytime` (`daytime`),
  KEY `diet` (`diet`),
  CONSTRAINT `dietplan_ibfk_1` FOREIGN KEY (`week`) REFERENCES `week` (`id`),
  CONSTRAINT `dietplan_ibfk_2` FOREIGN KEY (`daytime`) REFERENCES `daytime` (`id`),
  CONSTRAINT `dietplan_ibfk_3` FOREIGN KEY (`diet`) REFERENCES `diet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dietplan`
--

LOCK TABLES `dietplan` WRITE;
/*!40000 ALTER TABLE `dietplan` DISABLE KEYS */;
INSERT INTO `dietplan` VALUES (1,1,1,1),(2,1,1,2),(3,1,1,3),(4,9,7,5);
/*!40000 ALTER TABLE `dietplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dr`
--

DROP TABLE IF EXISTS `dr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `diet` int DEFAULT NULL,
  `recip` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `diet` (`diet`),
  KEY `recip` (`recip`),
  CONSTRAINT `dr_ibfk_1` FOREIGN KEY (`diet`) REFERENCES `diet` (`id`),
  CONSTRAINT `dr_ibfk_2` FOREIGN KEY (`recip`) REFERENCES `recip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dr`
--

LOCK TABLES `dr` WRITE;
/*!40000 ALTER TABLE `dr` DISABLE KEYS */;
INSERT INTO `dr` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,2,7),(8,2,8),(9,3,9),(10,3,10),(11,3,11),(12,3,12),(14,5,13),(15,5,14),(16,5,15);
/*!40000 ALTER TABLE `dr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recip`
--

DROP TABLE IF EXISTS `recip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recip` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recip`
--

LOCK TABLES `recip` WRITE;
/*!40000 ALTER TABLE `recip` DISABLE KEYS */;
INSERT INTO `recip` VALUES (1,'1 cup of Whole Grain Cereal'),(2,'1% milk or almond milk'),(3,'1/2 cup berries'),(4,'one whole egg'),(5,'3/4 egg whites'),(6,'1/4 cup lowfat cheese'),(7,'spinach, tomato wrapped in a low carb tortilla'),(8,'1/4 cup salsa if desired'),(9,'Saute bell peppers, tomatoes, onions until soft. Set aside'),(10,'Make omelet with one whole egg and 5 egg whites, then add cooked veggies'),(11,'Pair with ¼ cup lowfat cheese'),(12,'2 pieces of whole grain sprouted bread'),(13,'test'),(14,'test'),(15,'test');
/*!40000 ALTER TABLE `recip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplements`
--

DROP TABLE IF EXISTS `supplements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `image` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplements`
--

LOCK TABLES `supplements` WRITE;
/*!40000 ALTER TABLE `supplements` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL,
  `test` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'This is a test');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'email','admin','admin','0316124465','address this is new address ');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `week`
--

DROP TABLE IF EXISTS `week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `week` (
  `id` int NOT NULL AUTO_INCREMENT,
  `week` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `week`
--

LOCK TABLES `week` WRITE;
/*!40000 ALTER TABLE `week` DISABLE KEYS */;
INSERT INTO `week` VALUES (1,'WEEK 1'),(2,'WEEK 2'),(3,'WEEK 3'),(4,'WEEK 4'),(9,'Week 5');
/*!40000 ALTER TABLE `week` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-17  4:00:05

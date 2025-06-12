-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: mrtech
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mrtech`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mrtech` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mrtech`;

--
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batches` (
  `batchid` varchar(10) NOT NULL,
  `coursename` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `trainer` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`batchid`),
  KEY `batches_ibfk_1` (`coursename`),
  CONSTRAINT `batches_ibfk_1` FOREIGN KEY (`coursename`) REFERENCES `courses` (`coursename`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batches`
--

LOCK TABLES `batches` WRITE;
/*!40000 ALTER TABLE `batches` DISABLE KEYS */;
INSERT INTO `batches` VALUES ('JB1','JAVA FULL STACK',90,'Ramprasad','ON Going'),('PB1','PYTHON FULL STACK',90,'Ramprasad','ON Going');
/*!40000 ALTER TABLE `batches` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_student_Status` AFTER UPDATE ON `batches` FOR EACH ROW BEGIN
    UPDATE student 
    SET Status = NEW.status 
    WHERE BatchCode = NEW.batchid;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `CertificateID` int NOT NULL AUTO_INCREMENT,
  `StudentID` varchar(100) DEFAULT NULL,
  `StudentName` varchar(100) DEFAULT NULL,
  `Certificate` longblob,
  `FileType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CertificateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseid` varchar(10) NOT NULL,
  `coursename` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`courseid`),
  UNIQUE KEY `coursename` (`coursename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('CDM','DIGITAL MARKETING',45),('CJF','CORE JAVA (FOUNDATIONAL)',45),('CJFS','JAVA FULL STACK',90),('CMM','MULTI MEDIA',45),('CPF','PYTHON (FOUNDATIONAL)',45),('CPFS','PYTHON FULL STACK',90),('CWFS','WEB DEVELOPMENT FULL STACK',90),('CWNC','WEB DEVELOPMENT (WITHOUT CODING)',45),('PYPBI','PYTHON POWER BI',70);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailytransactions`
--

DROP TABLE IF EXISTS `dailytransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailytransactions` (
  `TransactionID` int NOT NULL AUTO_INCREMENT,
  `StudentID` int DEFAULT NULL,
  `BatchCode` varchar(20) DEFAULT NULL,
  `Course` varchar(50) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `MobileNumber` varchar(20) DEFAULT NULL,
  `AmountPaid` int DEFAULT NULL,
  `Term` varchar(20) DEFAULT NULL,
  `PaidDate` date DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `dailytransactions_ibfk_1` (`StudentID`),
  CONSTRAINT `dailytransactions_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailytransactions`
--

LOCK TABLES `dailytransactions` WRITE;
/*!40000 ALTER TABLE `dailytransactions` DISABLE KEYS */;
INSERT INTO `dailytransactions` VALUES (1,30714,'JB1','JAVA FULL STACK','Bhaskar Rao Sesatti','9100392244',8000,'1','2025-06-03'),(2,30715,'PB1','PYTHON FULL STACK','Bhaskar Sesatti','9632147865',15000,'1','2025-06-03'),(3,30714,'JB1','JAVA FULL STACK','Bhaskar Rao Sesatti','9100392244',500,'2','2025-06-03'),(4,30715,'PB1','PYTHON FULL STACK','Bhaskar Sesatti','9632147865',5000,'2','2025-06-03');
/*!40000 ALTER TABLE `dailytransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll`
--

DROP TABLE IF EXISTS `enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enroll` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `course` varchar(50) NOT NULL,
  `city` varchar(250) NOT NULL,
  `education` varchar(200) NOT NULL,
  `enrolldate` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `remark` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll`
--

LOCK TABLES `enroll` WRITE;
/*!40000 ALTER TABLE `enroll` DISABLE KEYS */;
INSERT INTO `enroll` VALUES (1,'sesatti Bhaskar rao','bsettiaafa1.3@gmail.com','9100391232','JAVA FULL STACK','Visakhapatanam','Degree','2025-06-03','Joined',NULL),(2,'sesatti Bhaskar rao','bsefa1.3@gmail.com','8795622154','JAVA FULL STACK','Visakhapatanam','Degree','2025-06-03','Not Interested',NULL),(3,'sesatti Bhaskar rao','bsaszfefa1.3@gmail.com','8562145564','JAVA FULL STACK','Visakhapatanam','Degree','2025-06-03','May Be','next batch');
/*!40000 ALTER TABLE `enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'Admin','$2b$12$Vps2fSsHgOIr1KPY1pm7kuf1CYN0OQFZ8Mv1KsNSEUr1pXfjCajlu','admin@medhaxl.in');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `StudentID` int NOT NULL AUTO_INCREMENT,
  `Campus` varchar(45) NOT NULL,
  `TrainingPartner` varchar(100) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `BatchCode` varchar(45) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `DateOfBirth` varchar(10) NOT NULL,
  `Age` int NOT NULL,
  `Religion` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `SubCategory` varchar(50) NOT NULL,
  `MobileNumber` varchar(15) NOT NULL,
  `MaritalStatus` varchar(20) NOT NULL,
  `BloodGroup` varchar(5) NOT NULL,
  `EmailID` varchar(100) NOT NULL,
  `MinQualification` varchar(100) NOT NULL,
  `YearOfPassingQualifyingExam` year NOT NULL,
  `HighestQualification` varchar(100) NOT NULL,
  `PhysicallyHandicapped` varchar(4) NOT NULL,
  `GuardianName` varchar(100) NOT NULL,
  `GuardianOccupation` varchar(100) NOT NULL,
  `GuardianPhone` varchar(15) NOT NULL,
  `GuardianAnnualIncome` decimal(10,2) NOT NULL,
  `DoorNo` varchar(50) NOT NULL,
  `Town` varchar(50) NOT NULL,
  `Mandal` varchar(50) NOT NULL,
  `PinCode` varchar(10) NOT NULL,
  `District` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `AadharNumber` varchar(16) NOT NULL,
  `ArogyasriCard` varchar(45) DEFAULT NULL,
  `DateOfAppilication` varchar(45) DEFAULT NULL,
  `RegistrationFe` varchar(45) DEFAULT NULL,
  `CashReceiptNo` varchar(45) DEFAULT NULL,
  `CashReceiptDate` varchar(45) DEFAULT NULL,
  `HostelOrDayscholar` varchar(45) DEFAULT NULL,
  `BedNo` varchar(45) DEFAULT NULL,
  `BankAccountNo` varchar(45) DEFAULT NULL,
  `NameOfBank` varchar(45) DEFAULT NULL,
  `BranchOfBank` varchar(45) DEFAULT NULL,
  `IfscCode` varchar(45) DEFAULT NULL,
  `RuralOrUrban` varchar(45) DEFAULT NULL,
  `BranchOrSubject` varchar(45) DEFAULT NULL,
  `CourseFee` int NOT NULL,
  `DiscountAppiled` int NOT NULL,
  `TotalFee` int NOT NULL,
  `TotalDue` int NOT NULL,
  `Status` varchar(45) NOT NULL,
  `CourseType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`StudentID`,`AadharNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=30716 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (30714,'Visakhapatnam','Medha XL','JAVA FULL STACK','JB1','Bhaskar Rao','Sesatti','MALE','01-01-2002',23,'HINDU','GENERAL','general','9100392244','UN-MARRIED','','bhaskarsesetti1.3@gmail.com','INTERMEDIATE',2023,'DEGREE','NO','is','sd','9100392244',10000000.00,'34','Visakhapatanam','ds','530040','Visakhapatnam','Andhra Pradesh','896248656958',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,15000,5000,8500,1500,'ON Going','Regular'),(30715,'Visakhapatnam','Medha XL','PYTHON FULL STACK','PB1','Bhaskar','Sesatti','MALE','01-01-2000',25,'HINDU','GENERAL','general','9632147865','UN-MARRIED','','skarsesetti1.3@gmail.com','INTERMEDIATE',2022,'DEGREE','NO','fd','df','6455989544',1000000.00,'65','Visakhapatanam','sDBH','530040','Visakhapatnam','Andhra Pradesh','963852741859',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,25000,1000,20000,4000,'On Going','Regular');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_login`
--

DROP TABLE IF EXISTS `student_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `can_id` varchar(50) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `can_id` (`can_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_login`
--

LOCK TABLES `student_login` WRITE;
/*!40000 ALTER TABLE `student_login` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainers` (
  `trainerid` varchar(10) NOT NULL,
  `trainername` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `skill1` varchar(100) DEFAULT NULL,
  `skill2` varchar(100) DEFAULT NULL,
  `skill3` varchar(100) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  PRIMARY KEY (`trainerid`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 14:47:13

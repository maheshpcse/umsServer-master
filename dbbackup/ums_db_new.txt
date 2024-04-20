/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.29 : Database - ums
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ums` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ums`;

/*Table structure for table `employees` */

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `empId` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `emailId` text,
  `dept` varchar(100) DEFAULT NULL,
  `dob` varchar(100) DEFAULT NULL,
  `profileIcon` text,
  `status` tinyint(1) DEFAULT '1',
  `createdBy` bigint DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`empId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employees` */

insert  into `employees`(`empId`,`fname`,`lname`,`emailId`,`dept`,`dob`,`profileIcon`,`status`,`createdBy`,`createdAt`,`updatedAt`) values 
(1,'Test 3','testing','sjkgh@yopmail.com','tech','1988-01-02','icon-2.JPG',1,1,'2024-01-24 12:39:27','2024-01-24 13:02:40'),
(2,'yuvraj','r','r@gmail.com','xyz','1982-09-19','icon-2.JPG',1,1,'2024-01-24 12:39:27',NULL),
(3,'ravi','rai','ravi@gmail.com','IT','1985-03-22','Untitled.png',1,2,'2024-01-24 12:39:27','2024-01-24 13:00:53'),
(5,'virat','kohli','v.kohli18@gmail.com','cricket','1989-02-14','mean_stack_new.png',1,1,'2024-01-24 12:57:00','2024-01-24 14:04:46'),
(7,'suresh','raina','s.raina03@gmail.com','cricket','1989-03-03','mean_stack_two.png',1,2,'2024-01-24 14:15:10',NULL),
(8,'rohit','sharma','r.sharma43@gmail.com','cricket','1987-01-30','mean_stack_three.png',0,2,'2024-01-24 14:18:56','2024-01-24 14:56:02');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` text,
  `password` text,
  `address` text,
  `mobile` varchar(50) DEFAULT NULL,
  `profile` text,
  `role` enum('employee','admin') DEFAULT 'employee',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`userId`,`fullname`,`username`,`email`,`password`,`address`,`mobile`,`profile`,`role`,`status`,`createdAt`,`updatedAt`) values 
(1,'testmaster','master','testmaster123@gmail.com','$2b$10$m6Q1rdFj1KOV42w2psirlONQka89eWPSGDZqXecG8zY6JS/rpng1u','Banglore, Karnataka, India, 560095','9876543210',NULL,'employee',1,'2024-01-23 10:31:48','2024-01-24 10:35:59'),
(2,'testadmin','admin','testadmin123@gmail.com','$2b$10$tNRN4swlBfIPQaJU0vpQiuSjqADHR8FqN3yIvaWVoJbGx0i1sjzTC','Banglore, Karnataka, India, 560095','9876543210',NULL,'employee',1,'2024-01-24 12:34:16','2024-01-24 12:35:13'),
(3,'testuser','user','testuser123@gmail.com','$2b$10$QYFN.zXpLwWcKqr2DPMMC.txrXOKNhNTTt9OIlvNHIEpb2t.bOcI6','Banglore, India','9876543210',NULL,'employee',1,'2024-01-24 12:47:24',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

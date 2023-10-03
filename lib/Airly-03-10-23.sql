CREATE DATABASE  IF NOT EXISTS `airly-studio-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `airly-studio-db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: airly-studio-db
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

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
-- Table structure for table `blog_post`
--

DROP TABLE IF EXISTS `blog_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_post` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `long_desc` mediumtext NOT NULL,
  `coverImage` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `upload_time` varchar(255) NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `created_by_idx` (`created_by`),
  CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post`
--

LOCK TABLES `blog_post` WRITE;
/*!40000 ALTER TABLE `blog_post` DISABLE KEYS */;
INSERT INTO `blog_post` VALUES ('e4e333f1-f9ec-482b-a626-cd36232a2ff5','Lorem Ipsum','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','{\"blocks\":[{\"key\":\"4hceq\",\"text\":\"What is Lorem Ipsum?\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":20,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":20,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":20,\"style\":\"fontsize-24\"},{\"offset\":0,\"length\":20,\"style\":\"fontfamily-DauphinPlain\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}},{\"key\":\"5nl6c\",\"text\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ??\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":12,\"length\":562,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":11,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":12,\"length\":562,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":11,\"style\":\"fontsize-14\"},{\"offset\":12,\"length\":562,\"style\":\"fontsize-14\"},{\"offset\":0,\"length\":11,\"style\":\"fontfamily-Open Sans\\\", Arial, sans-serif\"},{\"offset\":12,\"length\":562,\"style\":\"fontfamily-Open Sans\\\", Arial, sans-serif\"},{\"offset\":0,\"length\":11,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}}],\"entityMap\":{}}','xZO3njQwc-rectangle-copy-16@2x.png','52e455d2-ef79-4b0d-8d6f-16662549977a','2023-09-16 07:59:39',0);
/*!40000 ALTER TABLE `blog_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `coverImage` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `sortedOrder` int NOT NULL DEFAULT '1000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES ('27fb9388-8ab5-4232-8938-efcff813fd90','Movefit Design','Movefit is a fitness app, and our team is responsible for all aspects of its development, from branding and web design to complete development, including payment processing and API integration.','A5a1LKGwv-Cover.png','2023-09-16 03:33:25',0),('6c7f8f2f-5853-4579-bae7-fc78aecc1aac','Bitformance','We worked with Bitformance, a website that provides information on cryptocurrency stocks. We were responsible for developing their brand identity, website design, and both backend and frontend development.','si8XUk0Iq-Cover.png','2023-09-16 03:29:43',1),('959e0ea3-1ad3-44fd-a347-00c39f8e6db9','CannRank','CannRank is a medical marijuana discovery platform, and we are responsible for designing and developing the platform.','WbIaY8iC4-Cover D.png','2023-09-16 03:40:26',1000),('c7c91c9c-990b-470b-85da-bcf9bf84d94f','Nottingham University + AMPS','We collaborated with AMPS, a company that specializes in designing electric motors with the support of Nottingham University. Our role was to create their brand identity, website design and development.','geWPG4Y2r-Behance (Cover).png','2023-09-16 03:25:41',2);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_pictures`
--

DROP TABLE IF EXISTS `portfolio_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_pictures` (
  `id` varchar(255) NOT NULL,
  `portfolio_image_id` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `sortedOrder` int NOT NULL DEFAULT '1000',
  PRIMARY KEY (`id`),
  KEY `portfolio_image_id_idx` (`portfolio_image_id`),
  CONSTRAINT `portfolio_image_id` FOREIGN KEY (`portfolio_image_id`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_pictures`
--

LOCK TABLES `portfolio_pictures` WRITE;
/*!40000 ALTER TABLE `portfolio_pictures` DISABLE KEYS */;
INSERT INTO `portfolio_pictures` VALUES ('037a9ba0-f0a3-4138-b8e8-26cfa1d455a3','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','pxkoGE__um-Slice - 8.png',7),('08bb5c8f-7a2e-40a5-9cf2-a3618d78cd25','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','FPCU9ifGwU-Slice - 6.png',5),('0b315060-9747-491b-a648-cfa8e5b583e3','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','hhrcn0iTe-Slice - 1.png',0),('208225a9-2085-4ca3-a2d4-8ca96ccf8005','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','geGDNIKnf-Slice 1.png',0),('25488de8-295c-4558-ac73-40c7022e3020','c7c91c9c-990b-470b-85da-bcf9bf84d94f','ngHIpI0nFs-Slice - 3@2x.png',5),('2a7f1703-3398-49b9-bf83-959e8ad9dd98','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','SCouRpfhM3-Slice 2.png',1),('2e7d8757-f9ff-4731-8e6f-031e88ec9833','27fb9388-8ab5-4232-8938-efcff813fd90','u0wdXqT4ZM-Move Slice - 7.png',6),('329e289b-fb1b-4f8b-931b-b3b48b792579','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','Sm_vP3qbE7-Slice - 12.png',11),('32b55f02-56fa-4b48-be9e-354f91f202be','27fb9388-8ab5-4232-8938-efcff813fd90','NPzAtaXlXJ-Move Slice - 3.png',2),('3897c553-62e3-4b33-80c1-fd755ae2e69d','c7c91c9c-990b-470b-85da-bcf9bf84d94f','i3JZbOoSvy-Slice - 7@2x.png',6),('3be9e9ae-88a3-48fc-aa28-b9d669872467','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','dd-3k-txdw-Slice - 13.png',12),('3c41ac2e-ee74-463a-8a7c-c0e68bf57cc9','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','S-mY_ByIOk-Slice 3.png',2),('47f1254d-25eb-4308-b0d5-307107cd2f96','27fb9388-8ab5-4232-8938-efcff813fd90','JAWrSNotx4-Move Slice - 12.png',11),('489e77d7-8347-4dd4-9e02-9c53cfa3eb13','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','DBAURvHa3t-Slice - 11.png',10),('532b58a3-59ae-400e-9102-b20017cfc8e6','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','k5cdXfCUYd-Slice - 3.png',2),('5890971c-8ed5-4ba6-b4b6-971ae709c1c7','c7c91c9c-990b-470b-85da-bcf9bf84d94f','0uOVpPmMGe-Slice - 4@2x.png',3),('5b694d4e-a287-43e0-9d61-eb4a574419d5','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','gktJY-bLzH-Slice 11.png',10),('63780d3a-ef88-4d75-8136-4000f5b97bb9','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','byylBu2lXZ-Slice - 9.png',8),('685257a4-0848-4867-982e-cda440e47071','27fb9388-8ab5-4232-8938-efcff813fd90','VVpAvSt4AN-Move Slice - 5.png',4),('69c9f2ae-f33b-4c52-8721-0b2bc31a4d9f','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','fd-qlk2QiD-Slice - 10.png',9),('6db57856-69c9-41ee-bff3-db3293c4aa9e','27fb9388-8ab5-4232-8938-efcff813fd90','rQsFPhFd2y-Move Slice - 8.png',7),('6f18f3f8-bb02-4e3f-aed3-2c8a4cedd01e','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','9N5m-1cYPt-Slice 6.png',5),('754614de-4cec-47d5-8afb-83fd98313b10','27fb9388-8ab5-4232-8938-efcff813fd90','N3OVcwD5ku-Move Slice - 2.png',1),('7bcf489b-9d2c-4849-8201-46c3483edfde','c7c91c9c-990b-470b-85da-bcf9bf84d94f','nBTAze7YWw-Slice - 5@2x.png',1),('81bc13a5-fdf5-420b-b58b-ba8a8d3bde24','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','mCNicl3S7v-Slice 5.png',4),('85229b0c-71a4-44da-bf0a-ee8e46d44ac7','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','-b3BPa9g1i-Slice - 5.png',4),('8a4426f0-b661-421f-9bc6-334e91fef551','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','vczIcUMiS_-Slice - 2.png',1),('8ae635e1-a7e7-45d4-a11b-bc7acc8b8846','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','18ff4P24se-Slice - 7.png',6),('8fbeed3c-c61e-4ec7-8e7b-9fa43e1ab692','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','8pXO3iCKMc-Slice 9.png',8),('95893b92-6805-4879-b1f1-cd8bb0b84320','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','KErGivKS6c-Slice - 4.png',3),('a01ac3f4-9e67-4b95-a665-8ab72f0519e3','27fb9388-8ab5-4232-8938-efcff813fd90','YCCkdo1GIb-Move Slice - 6.png',5),('a3c2ace6-504b-4712-9ef6-f550f210a1e5','c7c91c9c-990b-470b-85da-bcf9bf84d94f','VBRAtZFh1e-Slice - 6@2x.png',2),('a4a1896b-5477-45a8-a2dd-f5084963bec6','27fb9388-8ab5-4232-8938-efcff813fd90','jRu6-j-gu4-Move Slice - 9.png',8),('a525be0e-8c70-44bb-bf74-cfb3718c5ecd','27fb9388-8ab5-4232-8938-efcff813fd90','cCjPxiYxTL-Move Slice - 10.png',9),('b4d26cf1-1fac-4c0b-8a20-1e889cfeda25','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','AaanLqUROR-Slice 7.png',6),('bb4f3c86-4734-4cae-8b83-e55182010964','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','7rYHeYfOL-Slice 8.png',7),('c75fa038-5048-412f-abef-5518b2b0e614','27fb9388-8ab5-4232-8938-efcff813fd90','g0GeQp3Dfz-Move Slice - 4.png',3),('cfe2e202-777c-4097-b0a5-9af17fbffe4f','27fb9388-8ab5-4232-8938-efcff813fd90','gma5Azz1wT-Move Slice - 11.png',10),('d0902564-2481-4faf-b1e7-72370249afce','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','YIzxS8ggX8-Slice 10.png',9),('e32123b4-b3c1-4de0-be24-5275c1e19387','c7c91c9c-990b-470b-85da-bcf9bf84d94f','7Xik-Yg9t-Slice - 1@2x.png',0),('e5b2cf0b-36e4-4bc1-9887-33500c297eb3','c7c91c9c-990b-470b-85da-bcf9bf84d94f','4CdiszEBjD-Slice - 2@2x.png',4),('ed6564d3-92fe-45dd-b932-37f2f2384f52','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','PzdZl5LN7q-Slice 4.png',3),('f7090b0f-58ca-4393-a188-a009567c2302','27fb9388-8ab5-4232-8938-efcff813fd90','WCDTvNdiZ-Move Slice - 1.png',0);
/*!40000 ALTER TABLE `portfolio_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_tags`
--

DROP TABLE IF EXISTS `portfolio_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_tags` (
  `id` varchar(255) NOT NULL,
  `portfolio_tag_id` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolio_tag_id_idx` (`portfolio_tag_id`),
  CONSTRAINT `portfolio_tag_id` FOREIGN KEY (`portfolio_tag_id`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_tags`
--

LOCK TABLES `portfolio_tags` WRITE;
/*!40000 ALTER TABLE `portfolio_tags` DISABLE KEYS */;
INSERT INTO `portfolio_tags` VALUES ('0a1512b2-a5a2-4461-a0e3-f2a1135dfde6','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','Website'),('0f551c1a-2b1c-42b8-9244-30dd3bb985a3','27fb9388-8ab5-4232-8938-efcff813fd90','Branding'),('212543ec-d1fe-440a-9078-231fc2a50c9b','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','Web Applications'),('228ed718-7735-407d-a558-b2eaea69f324','c7c91c9c-990b-470b-85da-bcf9bf84d94f','Website'),('3c16cca4-067b-4cfe-8eaa-6e538287c508','c7c91c9c-990b-470b-85da-bcf9bf84d94f','Branding'),('7b6acf6d-9a67-44ee-b8d7-56aef738efe5','959e0ea3-1ad3-44fd-a347-00c39f8e6db9','Branding'),('7f3844a8-9a46-4188-8312-6cf8b30df505','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','Web Applications'),('94a91258-9a64-463a-8fa2-740ef40e0311','6c7f8f2f-5853-4579-bae7-fc78aecc1aac','Website'),('a5795173-82e7-4a49-ac46-b45ba938dcbf','27fb9388-8ab5-4232-8938-efcff813fd90','Web Applications'),('d3f0f066-7802-4289-b9cb-446692d929b5','27fb9388-8ab5-4232-8938-efcff813fd90','Website');
/*!40000 ALTER TABLE `portfolio_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `registered` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('52e455d2-ef79-4b0d-8d6f-16662549977a','Airly','admin@gmail.com','$2a$10$W1ibm3zzbS5bSI78GVH00O/xXWz7qj1rds1K7916xRvf22ck7da5u','admin','2023-08-31 11:00:08','2023-10-02 07:18:20',NULL,NULL),('cbd6eea2-ea6c-4432-ac7e-3d5242dd1ae8','Airly Super Admin','superadmin@gmail.com','$2a$10$ZZ3y933zU.N9lz03aOHnBu8VxnoLgkMYtq6OqRmFtBRMNKmBrSGvy','superAdmin','2023-09-23 10:16:47','2023-09-23 10:17:49',NULL,NULL),('e228b88a-ca8a-4ce8-bfe5-6499788b46c9','Taraqul Islam Rony','rony120114@gmail.com','$2a$10$/DOHc.Vk0UhKV5heKbrzFelP3Hi6jmrQ8qozFohYuPlmuTJ/cW4IW','admin','2023-10-02 07:17:48','2023-10-02 07:18:38',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-03 19:20:04

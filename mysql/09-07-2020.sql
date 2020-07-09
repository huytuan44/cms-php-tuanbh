-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	5.6.26

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
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `title` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES (1,'tin tá»©c','Tá»•ng há»£p cÃ¡c tin tá»©c má»›i nháº¥t','2020-07-06 10:00:27','2020-07-09 04:59:51'),(2,'Phong cÃ¡ch','Tá»•ng há»£p cÃ¡c tin tá»©c vá» Phong cÃ¡ch','2020-07-06 10:00:35','2020-07-09 05:01:01'),(3,'thiÃªn nhiÃªn',NULL,'2020-07-06 10:02:33','2020-07-06 10:02:33'),(4,'sinh hoáº¡t',NULL,'2020-07-06 10:02:51','2020-07-06 10:02:51');
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parrent_comment` int(11) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_520_ci,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,0,'test nguoi 1',1,2,'2020-07-07 08:00:00','2020-07-07 08:00:00'),(2,0,'test nguoi 2',2,2,'2020-07-07 08:00:00','2020-07-07 08:00:00'),(3,1,'test tiep',3,2,'2020-07-07 08:00:00','2020-07-07 08:00:00'),(4,0,'test tiep',1,3,'2020-07-07 08:00:00','2020-07-07 08:00:00'),(5,2,'test nua',1,2,'2020-07-07 08:00:00','2020-07-07 08:00:00'),(6,0,'bÃ i viáº¿t nÃ y hay quÃ¡ Ä‘i',3,2,'2020-07-09 08:46:04','2020-07-09 08:46:04'),(7,0,'bÃ i viáº¿t nÃ y hay quÃ¡ Ä‘i',3,2,'2020-07-09 09:05:20','2020-07-09 09:05:20'),(8,0,'test thá»­ xem bÃ¬nh luáº­n tháº¿ nÃ o',1,5,'2020-07-09 09:29:29','2020-07-09 09:29:29'),(9,0,'tráº£ lá»i bÃ¬nh luáº­n',1,5,'2020-07-09 09:59:20','2020-07-09 09:59:20'),(10,9,'tráº£ lá»i bÃ¬nh luáº­n dÆ°á»›i',1,5,'2020-07-09 10:02:36','2020-07-09 10:02:36'),(11,0,'xin chÃ o máº¥y báº¡n',1,5,'2020-07-09 10:03:42','2020-07-09 10:03:42'),(12,11,'cho test phÃ¡t ná»¯a',1,5,'2020-07-09 10:04:39','2020-07-09 10:04:39'),(13,0,'ok rá»“i Ä‘áº¥y',1,5,'2020-07-09 10:04:46','2020-07-09 10:04:46'),(14,9,'test bÃ¬nh luáº­n bÃªn trÃªn',1,5,'2020-07-09 10:05:26','2020-07-09 10:05:26'),(15,13,'duyá»‡t thÃªm láº§n ná»¯a',1,5,'2020-07-09 10:19:03','2020-07-09 10:19:03'),(16,13,'duyá»‡t thÃªm phÃ¡t ná»¯a nÃ o',1,5,'2020-07-09 10:19:24','2020-07-09 10:19:24'),(17,13,'duyá»‡t thÃªm 1 láº§n ná»¯a',1,5,'2020-07-09 10:19:33','2020-07-09 10:19:33'),(18,0,'ok mÆ°á»£t rá»“i Ä‘áº¥y',1,5,'2020-07-09 10:19:40','2020-07-09 10:19:40');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `channel_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'ảnh test','https://16152916269290323.lotuscdn.vn/121196506542772224/2020/6/13/9803634416913747610414036207321812624211968o-15920230754421732625901.jpg',1,1,'2020-07-02 00:00:01','2020-07-02 00:00:01'),(2,'ảnh test 2','https://linkhay.mediacdn.vn/upload/media/24728.VHJQO5f06570384310.resized.jpg',2,1,'2020-07-02 00:00:01','2020-07-02 00:00:01'),(3,'áº£nh chiáº¿n tranh','assets/images/upload/g7ra9n7hxpnq4wprv40n.jpg',1,1,'2020-07-09 06:56:43','2020-07-09 06:56:43'),(4,'áº£nh hÃ i hÆ°á»›c','assets/images/upload/giphy.gif',1,3,'2020-07-09 07:01:03','2020-07-09 07:01:03'),(5,'áº£nh ná»™i tháº¥t','assets/images/upload/ban-lam-viec-barbier-713x450.jpg',1,1,'2020-07-09 07:13:16','2020-07-09 07:13:16'),(6,'áº£nh hÃ i hÆ°á»›c','assets/images/upload/1.PNG',1,1,'2020-07-09 10:36:07','2020-07-09 10:36:07');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_520_ci,
  `content` longtext COLLATE utf8mb4_unicode_520_ci,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `channel_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (2,'test','test content chÃ¡n quÃ¡','../assets/images/upload/1.PNG','1','2','2020-07-03 09:08:56','2020-07-03 11:13:13'),(3,'test ná»™i dung tiáº¿p theo nÃ o','abcaaaaaabbb','../assets/images/upload/giphy.gif','1','3','2020-07-03 09:10:03','2020-07-03 11:12:11'),(4,'táº­p lÃ m vblog','test thá»­ nÃ o','../assets/images/upload/quan-doi-my-cong-bo-3-video-ve-cac-ufo-bi-an.jpg','1','2','2020-07-03 11:25:51','2020-07-03 11:25:51'),(5,'Ná»™i tháº¥t phÃ²ng khÃ¡ch','PhÃ²ng khÃ¡ch lÃ  khÃ´ng gian chÃ­nh cá»§a ngÃ´i nhÃ , lÃ  nÆ¡i sum há»p cá»§a cÃ¡c thÃ nh viÃªn trong gia Ä‘Ã¬nh, thá»ƒ hiá»‡n gu tháº©m má»¹ vÃ  cÃ¡ tÃ­nh cá»§a gia chá»§. Nhá»¯ng máº«u phÃ²ng khÃ¡ch Ä‘áº¹p, tinh táº¿ Ä‘Æ°á»£c NhÃ  Xinh thiáº¿t káº¿ vÃ  sáº¯p Ä‘áº·t sáº½ mang Ä‘áº¿n cho báº¡n nhá»¯ng Ã½ tÆ°á»Ÿng Ä‘á»ƒ cÃ³ má»™t khÃ´ng gian nhÆ° Ã½.','assets/images/upload/713x450-phong-khach-maxine-nha-xinh.jpg','1','1','2020-07-09 04:11:00','2020-07-09 04:11:00'),(6,'Ná»™i tháº¥t phÃ²ng Äƒn','Má»™t bá»¯a Äƒn ngon luÃ´n lÃ  mong Æ°á»›c cá»§a má»—i gia Ä‘Ã¬nh. KhÃ´ng gian phÃ²ng Äƒn Ä‘Ã³ng vai trÃ² ráº¥t quan trá»ng trong vÄƒn hÃ³a Viá»‡t. Ná»™i tháº¥t NhÃ  Xinh mang Ä‘áº¿n nhá»¯ng khÃ´ng gian phÃ²ng Äƒn Ä‘áº¹p, tinh táº¿, lÃ  sá»± káº¿t há»£p hÃ i hÃ²a giá»¯a bÃ n Äƒn, gháº¿ Äƒn, tá»§, Ä‘á»“ trang trÃ­â€¦ cho báº¡n sá»± tiá»‡n nghi, gáº§n gÅ©i vÃ  thoáº£i mÃ¡i.','assets/images/upload/phong-an-bridge.jpg','1','1','2020-07-09 04:12:10','2020-07-09 04:12:10'),(7,'Ná»™i tháº¥t phÃ²ng ngá»§','PhÃ²ng ngá»§ chÃ­nh lÃ  khÃ´ng gian nghá»‰ ngÆ¡i, thÆ° giÃ£n sau ngÃ y dÃ i má»‡t má»i. Nhá»¯ng máº«u phÃ²ng ngá»§ cá»§a NhÃ  Xinh mang Ä‘áº¿n cáº£m giÃ¡c áº¥m cÃºng, gáº§n gÅ©i vÃ  thoáº£i mÃ¡i. Trong tÃ¢m phÃ²ng ngá»§ lÃ  nhá»¯ng chiáº¿c giÆ°á»ng ngá»§ thiáº¿t káº¿ Ä‘áº¹p, káº¿t há»£p vá»›i bÃ n Ä‘áº§u giÆ°á»ng, tá»§ Ã¡oâ€¦.nháº¥n nhÃ¡ thÃªm má»™t sá»‘ Ä‘Ã¨n , tháº£m vÃ  Ä‘á»“ trang trÃ­.','assets/images/upload/phong-ngu-may-713x450.jpg','1','1','2020-07-09 04:13:39','2020-07-09 04:13:39'),(8,'Ná»™i tháº¥t phÃ²ng lÃ m viá»‡c','Báº¡n sáº½ táº­p trung vÃ  sÃ¡ng táº¡o hÆ¡n vá»›i khÃ´ng gian lÃ m viá»‡c cá»§a ná»™i tháº¥t NhÃ  Xinh. HÃ£y lá»±a chá»n máº«u bÃ n lÃ m viá»‡c Ä‘áº¹p cÃ¹ng hÃ ng chá»¥c máº«u gháº¿ vá»›i kiá»ƒu dÃ¡ng, váº­t liá»‡u khÃ¡c nhau cá»§a NhÃ  Xinh.','assets/images/upload/ban-lam-viec-barbier-713x450.jpg','1','1','2020-07-09 04:26:59','2020-07-09 04:26:59'),(9,'Ná»™i tháº¥t báº¿p','TÃ­nh tháº©m má»¹, cÃ´ng nÄƒng, tiá»‡n nghi lÃ  nhá»¯ng yáº¿u tá»‘ cá»‘t lÃµi cá»§a khÃ´ng gian báº¿p. Vá»›i hÆ¡n 15 nÄƒm kinh nghiá»‡m trong thiáº¿t káº¿ vÃ  thi cÃ´ng tá»§ báº¿p, NhÃ  Xinh luÃ´n cáº­p nháº­t nhá»¯ng xu hÆ°á»›ng, váº­t liá»‡u má»›i cho khÃ´ng gian báº¿p tiá»‡n nghi, sang trá»ng vÃ  hÃ i hÃ²a cho báº¡n','assets/images/upload/bep-sunny-website-02.jpg','1','1','2020-07-09 04:27:44','2020-07-09 04:27:44');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tuanbh','123456','tuanbh@gmail.com',27,0,NULL,NULL),(2,'quynhht','123456','quynhht@gmail.com',22,1,NULL,NULL),(3,'huytuan44','123456','tuanbh@123456.com',25,0,'2020-06-30 03:00:17','2020-06-30 03:00:17'),(6,'tuanabc','123456','tuanbh@123456.com',12,0,'2020-06-30 03:02:23','2020-06-30 03:02:23'),(7,'tuanbh44','123','tuanbh@gmail.com123',21,0,'2020-07-03 01:52:10','2020-07-03 01:52:10'),(8,'abc','1','abc@email.com',21,0,'2020-07-08 02:01:07','2020-07-08 02:01:07'),(9,'aaa','1','abc@email.com',11,1,'2020-07-08 02:08:25','2020-07-08 02:08:25');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-09 18:25:25

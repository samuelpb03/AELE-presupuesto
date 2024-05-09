-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbs12752680
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo` (
  `articuloId` varchar(45) NOT NULL,
  `serieId` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `franja` int DEFAULT NULL,
  `medidas` varchar(45) NOT NULL,
  `puntos` int DEFAULT NULL,
  PRIMARY KEY (`articuloId`),
  KEY `serieId_idx` (`serieId`),
  CONSTRAINT `serieId` FOREIGN KEY (`serieId`) REFERENCES `serie` (`serie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES ('1',1,'Uniforme',0,'',NULL),('10',4,'Contemporanea',0,'',NULL),('100',22,'Formas 7 MINIME',0,'',NULL),('101',23,'Formas 7 A00',0,'',NULL),('102',22,'Formas 8 MINIME',0,'',NULL),('103',23,'Formas 8 A00',0,'',NULL),('104',24,'Provenzal A MINIME',0,'',NULL),('105',25,'Provenzal A A00',0,'',NULL),('106',24,'Provenzal B MINIME',0,'',NULL),('107',25,'Provenzal B A00',0,'',NULL),('108',26,'Interior',0,'',NULL),('109',26,'L abierta',0,'',NULL),('11',4,'Contemporanea 2',0,'',NULL),('110',27,'Balda',0,'',NULL),('111',27,'Balda cristal',0,'',NULL),('112',27,'Balda L',0,'',NULL),('113',27,'Balda extraíble',0,'',NULL),('114',27,'Balda inclinable',0,'',NULL),('115',28,'Divisor',0,'',NULL),('116',26,'Interior premium',0,'',NULL),('117',26,'L abierta premium',0,'',NULL),('118',27,'Balda premium 30',0,'',NULL),('119',27,'Balda cristal premium',0,'',NULL),('12',4,'Contemporanea 3',0,'',NULL),('120',27,'Balda L premium',0,'',NULL),('121',27,'Balda extraíble premium 30',0,'',NULL),('122',27,'Balda inclinable premium',0,'',NULL),('123',28,'Divisor premium 30',0,'',NULL),('124',8,'Gola V 600',0,'',NULL),('125',8,'Gola V 1200',0,'',NULL),('126',8,'Gola H',0,'',NULL),('127',8,'Rectangular',0,'',NULL),('128',8,'Piano',0,'',NULL),('129',8,'Atornillados AC 200',0,'',NULL),('13',5,'Aspas',0,'',NULL),('130',8,'Brave 1040 Asa descentrada',0,'',NULL),('131',8,'Brave 400',0,'',NULL),('132',8,'Brave 240',0,'',NULL),('133',8,'Brave 160',0,'',NULL),('134',8,'Rail 280',0,'',NULL),('135',8,'Rail 180',0,'',NULL),('136',8,'Ona 600',0,'',NULL),('137',8,'Ona 200',0,'',NULL),('138',8,'Ona 50',0,'',NULL),('139',8,'Graf Big 352',0,'',NULL),('14',6,'Provenzal A',0,'',NULL),('140',8,'Graf Big 224',0,'',NULL),('141',8,'Graf Big 38mm',0,'',NULL),('142',8,'Graf Big 50mm',0,'',NULL),('143 ',8,'Graf Big 18mm',0,'',NULL),('144',8,'Graf Mini 1200',0,'',NULL),('145',8,'Graf Mini 278',0,'',NULL),('146',8,'Graf Mini 182',0,'',NULL),('147',8,'Graf Mini 60',0,'',NULL),('149',8,'Flapp 200',0,'',NULL),('15',6,'Provenzal B',0,'',NULL),('150',8,'Flapp 70',0,'',NULL),('151',8,'Oh! Wood',0,'',NULL),('152',8,'Conic Wood',0,'',NULL),('16',7,'Formas 1',0,'',NULL),('17',7,'Formas 2',0,'',NULL),('18',7,'Formas 3',0,'',NULL),('19',7,'Formas 4',0,'',NULL),('2',1,'One 150',1,'',NULL),('20',7,'Formas 5',0,'',NULL),('21',7,'Formas 6 Diseño Libre',0,'',NULL),('22',7,'Formas 7',0,'',NULL),('23',7,'Formas 8',0,'',NULL),('24',29,'Vitrina',0,'',NULL),('25',8,'Gola V',0,'',NULL),('26',8,'Cuadrado',0,'',NULL),('27',8,'Pomo pequeño',0,'',NULL),('28',8,'Atornillados AC 80',0,'',NULL),('29',8,'Brave 1150',0,'',NULL),('3',1,'One 300',1,'',NULL),('30',8,'Rail 600',0,'',NULL),('31',8,'Ona 1100',0,'',NULL),('32',8,'Graf Big 1200',0,'',NULL),('33',8,'Bau',0,'',NULL),('34',8,'Equis',0,'',NULL),('35',8,'Flapp 1100',0,'',NULL),('36',8,'Oh!',0,'',NULL),('37',8,'Conic',0,'',NULL),('38',8,'Push puerta',0,'',NULL),('39',9,'Cerradura abatible',0,'',NULL),('4',1,'One 600',1,'',NULL),('40',9,'Cerradura corredera',0,'',NULL),('41',9,'Cerradura abatible falleba',0,'',NULL),('42',10,'Uniforme Minime',0,'',NULL),('43',11,'Uniforme A00',0,'',NULL),('44',12,'One 150 MINIME',1,'',NULL),('45',13,'One 150 A00',1,'',NULL),('46',12,'One 300 MINIME',1,'',NULL),('47',13,'One 300 A00',1,'',NULL),('48',12,'One 600 MINIME',1,'',NULL),('49',13,'One 600 A00',1,'',NULL),('5',2,'Medium',1,'',NULL),('50',14,'Duo 150 MINIME',1,'',NULL),('51',15,'Duo 150 A00',1,'',NULL),('52',14,'Duo A300 MINIME',1,'',NULL),('53',15,'Duo A300 A00',1,'',NULL),('54',14,'Duo B300 MINIME',1,'',NULL),('55',15,'Duo B300 A00',1,'',NULL),('56',14,'Medium MINIME ',1,'',NULL),('57',15,'Medium A00',1,'',NULL),('58',16,'Multy1 MINIME',1,'',NULL),('59',17,'Multy1 A00',1,'',NULL),('6',2,'Duo 150',1,'',NULL),('60',16,'Multy2 MINIME',1,'',NULL),('61',17,'Multy2 A00',1,'',NULL),('62',16,'Multy3 MINIME',1,'',NULL),('63',17,'Multy3 A00',1,'',NULL),('64',16,'Multy4 MINIME',1,'',NULL),('65',17,'Multy4 A00',1,'',NULL),('66',16,'Multy5 MINIME',1,'',NULL),('67',17,'Multy5 A00',1,'',NULL),('68',16,'Multy6 MINIME',1,'',NULL),('69',17,'Multy6 A00',1,'',NULL),('7',2,'Duo A300',1,'',NULL),('70',16,'Multy7 MINIME',1,'',NULL),('71',17,'Multy7 A00',1,'',NULL),('72',16,'Multy8 MINIME',1,'',NULL),('73',17,'Multy8 A00',1,'',NULL),('74',16,'Multy9 MINIME',1,'',NULL),('75',17,'Multy9 A00',1,'',NULL),('76',16,'Multy10 MINIME',1,'',NULL),('77',17,'Multy10 A00',1,'',NULL),('78',18,'Verty1 MINIME',1,'',NULL),('79',19,'Very1 A00',1,'',NULL),('8',2,'Duo B300',1,'',NULL),('80',18,'Verty2 MINIME',1,'',NULL),('81',19,'Verty2 A00',1,'',NULL),('82',18,'Verty3 MINIME',1,'',NULL),('83',19,'Verty3 A00',1,'',NULL),('84',18,'Verty4 MINIME',1,'',NULL),('85',19,'Verty4 A00',1,'',NULL),('86',20,'Combinaciones MINIME',1,'',NULL),('87',21,'Combinaciones A00',1,'',NULL),('88',22,'Formas1 MINIME',0,'',NULL),('89',23,'Formas1 A00',0,'',NULL),('9',3,'Verty',1,'',NULL),('90',22,'Formas 2 MINIME',0,'',NULL),('91',23,'Formas 2 A00',0,'',NULL),('92',22,'Formas 3 MINIME',0,'',NULL),('93',23,'Formas 3 A00',0,'',NULL),('94',22,'Formas 4 MINIME',0,'',NULL),('95',23,'Formas 4 A00',0,'',NULL),('96',22,'Formas 5 MINIME',0,'',NULL),('97',23,'Formas 5 A00',0,'',NULL),('98',22,'Formas 6 MINIME',0,'',NULL),('99',23,'Formas 6 A00',0,'',NULL);
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `color_id` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Roble Blanqueado'),(2,'Roble Etna'),(3,'Roble Malibu'),(4,'Nogal Nature'),(5,'Cross Beige'),(6,'Cross Maya'),(7,'Fresno Evora'),(8,'Titanium Cera'),(9,'Tofu'),(10,'Roble Terra'),(11,'Roble Arabian'),(12,'Roble Fume'),(13,'Nogal Nuit'),(14,'Negro'),(15,'Blanco Wax'),(16,'Roble Aurora'),(17,'Tabacco Spazzolato'),(18,'Fine Gold'),(19,'Plomo Mate'),(20,'Rosso Jaipur'),(21,'Terra Mate'),(22,'Grigio Londra'),(23,'Gris Pizarra'),(24,'Grafito Mate'),(25,'Antracita Mate'),(26,'Verde Comodoro'),(27,'Nube Mate'),(28,'Arena Mate'),(29,'Blanco Milano'),(30,'Setasil'),(31,'Celadon');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tienda` int NOT NULL,
  `usuario` int DEFAULT NULL,
  `ubicacion` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente_empresa` (`usuario`),
  KEY `fk_tienda_empresa` (`tienda`),
  CONSTRAINT `fk_cliente_empresa` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_tienda_empresa` FOREIGN KEY (`tienda`) REFERENCES `tienda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,1,1,'Calle de ejemplo','Empresa de Ejemplo'),(3,2,2,'Ubicacion ejemplo','Server');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `material_id` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Chapa'),(2,'Laca'),(3,'Melamina'),(4,'Cristal'),(5,'Otro'),(6,'Cristal lacobel'),(7,'Cristal templado ahumado'),(8,'Cristal templado');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_color`
--

DROP TABLE IF EXISTS `material_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_color` (
  `id_material` int NOT NULL,
  `id_color` int NOT NULL,
  PRIMARY KEY (`id_material`,`id_color`),
  UNIQUE KEY `id_color_UNIQUE` (`id_color`),
  CONSTRAINT `material_color_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `material` (`material_id`),
  CONSTRAINT `material_color_ibfk_2` FOREIGN KEY (`id_color`) REFERENCES `color` (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_color`
--

LOCK TABLES `material_color` WRITE;
/*!40000 ALTER TABLE `material_color` DISABLE KEYS */;
INSERT INTO `material_color` VALUES (1,1),(1,2),(1,3),(1,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(2,17),(2,18),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(2,31);
/*!40000 ALTER TABLE `material_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medidas`
--

DROP TABLE IF EXISTS `medidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medidas` (
  `id` int NOT NULL,
  `medidas` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medidas`
--

LOCK TABLES `medidas` WRITE;
/*!40000 ALTER TABLE `medidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `medidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Frentes Abatibles'),(2,'Tiradores'),(3,'Frentes correderos'),(4,'Interiores ');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serie`
--

DROP TABLE IF EXISTS `serie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serie` (
  `serie_id` int NOT NULL,
  `producto_id` int DEFAULT NULL,
  `franja` int DEFAULT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `serie_material` int DEFAULT NULL,
  PRIMARY KEY (`serie_id`),
  KEY `producto_idx` (`producto_id`),
  KEY `serie_material_idx` (`serie_material`),
  CONSTRAINT `productoId` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`producto_id`),
  CONSTRAINT `serie_material` FOREIGN KEY (`serie_material`) REFERENCES `serie_material` (`id_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serie`
--

LOCK TABLES `serie` WRITE;
/*!40000 ALTER TABLE `serie` DISABLE KEYS */;
INSERT INTO `serie` VALUES (1,1,1,'serieOne','face',NULL),(2,1,1,'serieDuo','face',NULL),(3,1,1,'serieVerty','face',NULL),(4,1,0,'contemporanea','abatible',NULL),(5,1,0,'aspas','abatible',NULL),(6,1,0,'provenzal','abatible',NULL),(7,1,0,'serieFormas','abatible',NULL),(8,2,0,'tirador','tirador',NULL),(9,3,0,'cerradura','cerradura',NULL),(10,4,0,'uniforme','correderaMINIME',NULL),(11,5,0,'uniforme','correderaA00',NULL),(12,4,1,'serieOne','correderaMINIME',NULL),(13,5,1,'serieOne','correderaA00',NULL),(14,4,1,'serieDuo','correderaMINIME',NULL),(15,5,1,'serieDuo','correderaA00',NULL),(16,4,1,'serieMulty','correderaMINIME',NULL),(17,5,1,'serieMulty','correderaA00',NULL),(18,4,1,'serieVerty','correderaMINIME',NULL),(19,5,1,'serieVerty','correderaA00',NULL),(20,4,1,'serieCombinaciones','correderaMINIME',NULL),(21,5,1,'serieCombinaciones','correderaA00',NULL),(22,4,0,'serieFormas','correderaMINIME',NULL),(23,5,0,'serieFormas','correderaA00',NULL),(24,4,0,'serieProvenzal','correderaMINIME',NULL),(25,5,0,'serieProvenzal','correderaA00',NULL),(26,6,0,'interiores','vestidores',NULL),(27,6,0,'interiores','baldas',NULL),(28,6,0,'interiores','divisor',NULL),(29,1,0,'vitrina','abatible',NULL);
/*!40000 ALTER TABLE `serie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serie_material`
--

DROP TABLE IF EXISTS `serie_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serie_material` (
  `id_serie` int NOT NULL,
  `id_material` int NOT NULL,
  PRIMARY KEY (`id_serie`,`id_material`),
  KEY `id_mat_idx` (`id_material`),
  CONSTRAINT `id_mat` FOREIGN KEY (`id_material`) REFERENCES `material` (`material_id`),
  CONSTRAINT `id_ser` FOREIGN KEY (`id_serie`) REFERENCES `serie` (`serie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serie_material`
--

LOCK TABLES `serie_material` WRITE;
/*!40000 ALTER TABLE `serie_material` DISABLE KEYS */;
INSERT INTO `serie_material` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(1,3),(2,3),(3,3),(10,3),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(21,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,4),(18,4),(19,4),(20,4),(21,4),(8,5),(9,5),(26,5),(27,5),(28,5),(10,6),(11,6),(10,7),(11,7),(29,8);
/*!40000 ALTER TABLE `serie_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tienda`
--

DROP TABLE IF EXISTS `tienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `empresa` int NOT NULL,
  `ubicacion` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente` (`cliente`),
  KEY `fk_empresa_tienda` (`empresa`),
  CONSTRAINT `fk_cliente` FOREIGN KEY (`cliente`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_empresa_tienda` FOREIGN KEY (`empresa`) REFERENCES `empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tienda`
--

LOCK TABLES `tienda` WRITE;
/*!40000 ALTER TABLE `tienda` DISABLE KEYS */;
INSERT INTO `tienda` VALUES (1,'Tienda de Ejemplo',1,'Calle de segundo ejemplo',1),(2,'Segunda tienda',1,'Segunda ubicacion',1),(3,'Otra tienda de ejemplo',2,'Ubicacion tercera',3);
/*!40000 ALTER TABLE `tienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `empresa` int NOT NULL,
  `tienda` int DEFAULT NULL,
  `valor_puntos` float NOT NULL,
  `nivel` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tienda` (`tienda`),
  KEY `fk_empresa` (`empresa`),
  CONSTRAINT `fk_empresa` FOREIGN KEY (`empresa`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fk_tienda` FOREIGN KEY (`tienda`) REFERENCES `tienda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'samuel',1,1,1,1),(2,'Oscar',1,1,1,1),(3,'Alonso',1,1,1,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-09 10:49:04

-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: dbs12752680
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo` (
  `articulo_id` int NOT NULL,
  `serie_id` int NOT NULL,
  `nombre` varchar(90) NOT NULL,
  `franja` int DEFAULT NULL,
  PRIMARY KEY (`articulo_id`),
  KEY `serieId_idx` (`serie_id`),
  CONSTRAINT `serieId` FOREIGN KEY (`serie_id`) REFERENCES `serie` (`serie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES (1,1,'Uniforme',0),(2,1,'One 150',1),(3,1,'One 300',1),(4,1,'One 600',1),(5,1,'Medium',1),(6,1,'Duo 150',1),(7,1,'Duo A300',1),(8,1,'Duo B300',1),(9,1,'Verty',1),(10,4,'Contemporanea',0),(11,4,'Contemporanea 2',0),(12,4,'Contemporanea 3',0),(13,5,'Aspas',0),(14,6,'Provenzal A',0),(15,6,'Provenzal B',0),(16,7,'Formas 1',0),(17,7,'Formas 2',0),(18,7,'Formas 3',0),(19,7,'Formas 4',0),(20,7,'Formas 5',0),(21,7,'Formas 6 Diseño Libre',0),(22,7,'Formas 7',0),(23,7,'Formas 8',0),(24,38,'Vitrina',0),(25,8,'Gola V',0),(26,8,'Cuadrado',0),(27,8,'Pomo pequeño',0),(28,8,'Atornillados AC 80',0),(29,8,'Brave 1150',0),(30,8,'Rail 600',0),(31,8,'Ona 1100',0),(32,8,'Graf Big 1200',0),(33,8,'Bau',0),(34,8,'Equis',0),(35,8,'Flapp 1100',0),(36,8,'Oh!',0),(37,8,'Conic',0),(38,8,'Push puerta',0),(39,9,'Cerradura abatible',0),(40,9,'Cerradura corredera',0),(41,9,'Cerradura abatible falleba',0),(42,10,'Uniforme Minime',0),(43,11,'Uniforme A00',0),(44,12,'One 150 MINIME',1),(45,13,'One 150 A00',1),(46,12,'One 300 MINIME',1),(47,13,'One 300 A00',1),(48,12,'One 600 MINIME',1),(49,13,'One 600 A00',1),(50,14,'Duo 150 MINIME',1),(51,15,'Duo 150 A00',1),(52,14,'Duo A300 MINIME',1),(53,15,'Duo A300 A00',1),(54,14,'Duo B300 MINIME',1),(55,15,'Duo B300 A00',1),(56,14,'Medium MINIME ',1),(57,15,'Medium A00',1),(58,16,'Multy1 MINIME',1),(59,17,'Multy1 A00',1),(60,16,'Multy2 MINIME',1),(61,17,'Multy2 A00',1),(62,16,'Multy3 MINIME',1),(63,17,'Multy3 A00',1),(64,16,'Multy4 MINIME',1),(65,17,'Multy4 A00',1),(66,16,'Multy5 MINIME',1),(67,17,'Multy5 A00',1),(68,16,'Multy6 MINIME',1),(69,17,'Multy6 A00',1),(70,16,'Multy7 MINIME',1),(71,17,'Multy7 A00',1),(72,16,'Multy8 MINIME',1),(73,17,'Multy8 A00',1),(74,16,'Multy9 MINIME',1),(75,17,'Multy9 A00',1),(76,16,'Multy10 MINIME',1),(77,17,'Multy10 A00',1),(78,18,'Verty1 MINIME',1),(79,19,'Very1 A00',1),(80,18,'Verty2 MINIME',1),(81,19,'Verty2 A00',1),(82,18,'Verty3 MINIME',1),(83,19,'Verty3 A00',1),(84,18,'Verty4 MINIME',1),(85,19,'Verty4 A00',1),(86,20,'Combinaciones MINIME',1),(87,21,'Combinaciones A00',1),(88,22,'Formas1 MINIME',0),(89,23,'Formas1 A00',0),(90,22,'Formas 2 MINIME',0),(91,23,'Formas 2 A00',0),(92,22,'Formas 3 MINIME',0),(93,23,'Formas 3 A00',0),(94,22,'Formas 4 MINIME',0),(95,23,'Formas 4 A00',0),(96,22,'Formas 5 MINIME',0),(97,23,'Formas 5 A00',0),(98,22,'Formas 6 MINIME',0),(99,23,'Formas 6 A00',0),(100,22,'Formas 7 MINIME',0),(101,23,'Formas 7 A00',0),(102,22,'Formas 8 MINIME',0),(103,23,'Formas 8 A00',0),(104,24,'Provenzal A MINIME',0),(105,25,'Provenzal A A00',0),(106,24,'Provenzal B MINIME',0),(107,25,'Provenzal B A00',0),(108,26,'Interior 300-450',0),(109,26,'L abierta 901-1200',0),(110,27,'Balda',0),(111,27,'Balda cristal',0),(112,27,'Balda L',0),(113,27,'Balda extraíble',0),(114,27,'Balda inclinable',0),(115,28,'Divisor',0),(116,26,'Interior premium 300-450',0),(117,26,'L abierta premium 901-1200',0),(118,27,'Balda premium 30',0),(119,27,'Balda cristal premium',0),(120,27,'Balda L premium',0),(121,27,'Balda extraíble premium 30',0),(122,27,'Balda inclinable premium',0),(123,28,'Divisor premium 30',0),(124,8,'Gola V 600',0),(125,8,'Gola V 1200',0),(126,8,'Gola H',0),(127,8,'Rectangular',0),(128,8,'Piano',0),(129,8,'Atornillados AC 200',0),(130,8,'Brave 1040 Asa descentrada',0),(131,8,'Brave 400',0),(132,8,'Brave 240',0),(133,8,'Brave 160',0),(134,8,'Rail 280',0),(135,8,'Rail 180',0),(136,8,'Ona 600',0),(137,8,'Ona 200',0),(138,8,'Ona 50',0),(139,8,'Graf Big 352',0),(140,8,'Graf Big 224',0),(141,8,'Graf Big 38mm',0),(142,8,'Graf Big 50mm',0),(143,8,'Graf Big 18mm',0),(144,8,'Graf Mini 1200',0),(145,8,'Graf Mini 278',0),(146,8,'Graf Mini 182',0),(147,8,'Graf Mini 60',0),(149,8,'Flapp 200',0),(150,8,'Flapp 70',0),(151,8,'Oh! Wood',0),(152,8,'Conic Wood',0),(153,29,'Costado Iluminado hasta 2700',0),(154,29,'Costado Iluminado hasta 2700 (Iluminación 2 lados)',0),(155,32,'Barra de colgar',0),(156,32,'Colgador Abatible',0),(157,32,'Cajon ST',0),(158,32,'Cajon Style-you',0),(159,32,'Cajon Soft',0),(160,32,'Cajon Soft Cristal',0),(161,32,'Cajon Mini Soft',0),(162,32,'Separador Mini',0),(163,32,'Cajon Soft + Mini Oculto',0),(164,32,'Pantalonero Bastidor Extraible',0),(165,32,'Pantalonero Simple',0),(166,32,'Pantalonero Doble',0),(167,32,'Zapatero Extraible Frente',0),(168,32,'Espejo Adherido',0),(169,33,'Espejo Extraible Orientable',0),(170,33,'Pantalonero Barras ',0),(171,33,'Pantalonero Extraible Cierre Amortiguado',0),(172,33,'Pantalonero Extraible Doble Cierre Amortiguado',0),(173,33,'Pantalonero Extraible Lateral',0),(174,33,'Bandeja Cuero Multifuncion',0),(175,33,'Bandeja Joyero',0),(176,33,'Bandeja de Cuero',0),(177,33,'Cesta Metalica',0),(178,33,'Perfil Para Balda Marco Extensible',0),(179,33,'Zapatero Metalico',0),(180,33,'Soporte Perchas Extraible Amortiguado',0),(181,33,'Perchero Abatible Cierre Amortiguado',0),(182,31,'Costados Iluminados hasta 2700',0),(183,31,'Costado Central Hasta 2700 (2 Lados)',0),(184,31,'Balda con luz 451-600',0),(185,31,'Balda con luz 601-900',0),(186,31,'Balda con luz 901-1200',0),(187,31,'Interruptor normal',0),(188,31,'Sensor movimiento',0),(189,31,'Sensor Puertas Abatibles',0),(190,34,'Cajeado columna',0),(191,34,'Cajeado viga horizontal',0),(192,34,'Cajeado viga saliente',0),(193,34,'Tirada horizontal',0),(194,35,'Tirada vertical',0),(195,35,'Gran altura',0),(196,26,'Interior 451-600',0),(197,26,'Interior 601-900',0),(198,26,'Interior 901-1200',0),(199,26,'Interior premium 451-600',0),(200,26,'Interior premium 601-900',0),(201,26,'Interior premium 901-1200',0),(202,37,'Remate completo Correderas de pared a pared',0),(203,37,'Remate completo correderas de pared a costado visto',0),(204,37,'Remate completo correderas dos costados vistos',0),(205,37,'Remate completo correderas con premarco',0),(206,37,'Remate completo abatibles e interiores de pared a pared',0),(207,37,'Remate completo abatibles e interiores de pared a costado visto',0),(208,37,'Remate completo abatibles e interiores dos costados vistos',0),(209,37,'Remate completo abatibles e interiores especial forrado',0),(210,30,'Kanto',0),(211,32,'Perchero Extraible',0),(212,34,'Tirada Vertical',0),(213,34,'Tirada Posterior',0),(214,34,'Gran altura',0);
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
INSERT INTO `color` VALUES (1,'Roble Blanqueado'),(2,'Roble Etna'),(3,'Roble Malibu'),(4,'Nogal Nature'),(5,'Cross Beige'),(6,'Cross Maya'),(7,'Fresno Evora'),(8,'Titanium Cera'),(9,'Tofu'),(10,'Roble Terra'),(11,'Roble Arabian'),(12,'Roble Fume'),(13,'Nogal Nuit'),(14,'Negro'),(15,'Blanco Wax'),(16,'Roble Aurora'),(17,'Tabacco Spazzolato'),(18,'Fine Gold'),(19,'Plomo Mate'),(20,'Rosso Jaipur'),(21,'Terra Mate'),(22,'Grigio Londra'),(23,'Gris Pizarra'),(24,'Grafito Mate'),(25,'Antracita Mate'),(26,'Verde Comodoro'),(27,'Nube Mate'),(28,'Arena Mate'),(29,'Blanco Milano'),(30,'Setasil'),(31,'Celadon'),(32,'Roble nature'),(33,'Blanco'),(34,'Plata'),(35,'Gris Metal'),(36,'Blanco Metal'),(37,'Negro Metal'),(38,'Inox Look'),(39,'Latón Cava Cepillado'),(40,'Negro Cepillado'),(41,'Latón Oscuro Cepillado'),(42,'Latón Cepillado'),(43,'Negro Mate'),(44,'Níquel Cepillado'),(45,'Oro Cepillado'),(46,'Blanco Mate'),(47,'Cromo Brillo'),(48,'Latón Brillo'),(49,'Latón Cava'),(50,'Gris Musgo'),(51,'Roble'),(52,'Nogal'),(53,'Fresno Lacado Negro'),(54,'Otro'),(55,'Color según muestra'),(56,'Laca según muestra');
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
INSERT INTO `material` VALUES (1,'Chapa'),(2,'Laca'),(3,'Melamina'),(4,'Cristal'),(5,'Otro'),(6,'Cristal lacobel'),(7,'Cristal templado ahumado'),(8,'Cristal templado'),(9,'Tirador 1'),(10,'Tirador 2'),(11,'Tirador 3'),(12,'Tirador 4'),(13,'Tirador 5'),(14,'Tirador 6'),(15,'Tirador 7'),(16,'Tirador 8'),(17,'Tirador 9'),(18,'Tirador 10'),(19,'Tirador 11'),(20,'Tirador otro');
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
  KEY `material_a_color_idx` (`id_color`),
  CONSTRAINT `material_a_color` FOREIGN KEY (`id_color`) REFERENCES `color` (`color_id`),
  CONSTRAINT `material_color_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `material` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_color`
--

LOCK TABLES `material_color` WRITE;
/*!40000 ALTER TABLE `material_color` DISABLE KEYS */;
INSERT INTO `material_color` VALUES (1,1),(1,2),(1,3),(1,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(9,14),(3,15),(3,16),(2,17),(4,17),(2,18),(4,18),(2,19),(4,19),(2,20),(4,20),(2,21),(4,21),(2,22),(4,22),(2,23),(4,23),(2,24),(4,24),(2,25),(4,25),(2,26),(4,26),(2,27),(4,27),(2,28),(4,28),(2,29),(4,29),(2,30),(4,30),(2,31),(4,31),(9,33),(9,34),(10,35),(10,36),(10,37),(11,38),(12,38),(13,38),(11,39),(11,40),(12,40),(13,40),(12,41),(13,42),(14,43),(15,43),(17,43),(19,43),(14,44),(17,44),(14,45),(15,46),(19,46),(15,47),(15,48),(17,49),(19,50),(16,51),(18,51),(16,52),(18,52),(18,53),(8,54),(20,54),(1,55),(2,56);
/*!40000 ALTER TABLE `material_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medidas`
--

DROP TABLE IF EXISTS `medidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medidas` (
  `medidas_id` int NOT NULL AUTO_INCREMENT,
  `medidas` varchar(45) DEFAULT NULL,
  `puntos` int DEFAULT NULL,
  `articulos_id` int DEFAULT NULL,
  `material` int DEFAULT NULL,
  PRIMARY KEY (`medidas_id`),
  KEY `articulo_id_idx` (`articulos_id`),
  KEY `material_idx` (`material`),
  CONSTRAINT `articulo_id` FOREIGN KEY (`articulos_id`) REFERENCES `articulo` (`articulo_id`),
  CONSTRAINT `material` FOREIGN KEY (`material`) REFERENCES `serie_material` (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=700 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medidas`
--

LOCK TABLES `medidas` WRITE;
/*!40000 ALTER TABLE `medidas` DISABLE KEYS */;
INSERT INTO `medidas` VALUES (1,'300-450',248,1,1),(2,'451-600',261,1,1),(3,'300-450',240,1,2),(4,'451-600',254,1,2),(5,'300-450',175,1,3),(6,'451-600',182,1,3),(7,'300-450',243,1,4),(8,'451-600',258,1,4),(9,'300-450',337,2,1),(10,'451-600',354,2,1),(11,'300-450',302,2,2),(12,'451-600',315,2,2),(13,'300-450',259,2,3),(14,'451-600',272,2,3),(15,'300-450',306,2,4),(16,'451-600',319,2,4),(17,'600-900',241,42,3),(18,'300-450',19,155,5),(19,'451-600',25,155,5),(20,'601-900',29,155,5),(21,'901-1200',34,155,5),(22,'400-640',196,156,5),(23,'600-1000',196,156,5),(24,'770-1200',196,156,5),(25,NULL,159,108,3),(27,'300-450',350,3,1),(28,'451-600',367,3,1),(29,'300-450',312,3,2),(30,'451-600',328,3,2),(31,'300-450',266,3,3),(32,'451-600',283,3,3),(33,'300-450',316,3,4),(34,'451-600',331,3,4),(35,'300-450',372,4,1),(36,'451-600',399,4,1),(37,'300-450',332,4,2),(38,'451-600',357,4,2),(39,'300-450',296,4,3),(40,'451-600',314,4,3),(41,'300-450',349,4,4),(42,'451-600',360,4,4),(43,'300-450',422,5,1),(44,'451-600',441,5,1),(45,'300-450',378,5,2),(46,'451-600',394,5,2),(47,'300-450',281,5,3),(48,'451-600',294,5,3),(49,'300-450',383,5,4),(50,'451-600',398,5,4),(51,'300-450',422,6,1),(52,'451-600',441,6,1),(53,'300-450',378,6,2),(54,'451-600',394,6,2),(55,'300-450',281,6,3),(56,'451-600',294,6,3),(57,'300-450',383,6,4),(58,'451-600',398,6,4),(59,'300-450',444,7,1),(60,'451-600',462,7,1),(61,'300-450',398,7,2),(62,'451-600',415,7,2),(63,'300-450',296,7,3),(64,'451-600',312,7,3),(65,'300-450',402,7,4),(66,'451-600',419,7,4),(67,'300-450',444,8,1),(68,'451-600',462,8,1),(69,'300-450',398,8,2),(70,'451-600',415,8,2),(71,'300-450',296,8,3),(72,'451-600',312,8,3),(73,'300-450',402,8,4),(74,'451-600',419,8,4),(75,'451-600',479,9,1),(76,'451-600',430,9,2),(77,'451-600',320,9,3),(78,'451-600',434,9,4),(79,'451-600',304,10,1),(80,'451-600',296,10,2),(81,'451-600',311,10,4),(82,'451-600',320,11,1),(83,'451-600',307,11,2),(84,'451-600',325,11,4),(85,'451-600',338,12,1),(86,'451-600',319,12,2),(87,'451-600',341,12,4),(88,'451-600',346,13,2),(89,'451-600',326,14,2),(90,'451-600',326,15,2),(91,'451-600',259,16,2),(92,'451-600',259,17,2),(93,'451-600',259,18,2),(94,'451-600',259,19,2),(95,'451-600',259,20,2),(96,'451-600',378,21,2),(97,'451-600',259,22,2),(98,'300-450',247,23,2),(99,'451-600',259,23,2),(100,'300-450',443,24,8),(101,'451-600',470,24,8),(102,NULL,75,25,20),(103,NULL,29,124,20),(104,NULL,51,125,20),(105,NULL,35,126,20),(106,NULL,12,26,9),(107,NULL,26,127,9),(108,NULL,75,128,9),(109,NULL,5,27,9),(110,NULL,5,28,9),(111,NULL,11,129,9),(112,NULL,46,29,10),(113,NULL,41,130,10),(114,NULL,19,131,10),(115,NULL,15,132,10),(116,NULL,12,133,10),(117,NULL,73,30,11),(118,NULL,38,134,11),(119,NULL,22,135,11),(120,NULL,65,31,12),(121,NULL,36,136,12),(122,NULL,12,137,12),(123,NULL,10,138,12),(124,NULL,80,32,13),(125,NULL,33,139,13),(128,NULL,122,190,5),(129,NULL,65,191,5),(130,NULL,94,194,5),(131,NULL,104,195,5),(132,NULL,266,202,1),(133,NULL,266,202,2),(134,NULL,143,202,3),(135,'300-450',40,118,5),(136,NULL,247,182,5),(137,NULL,374,183,5),(138,NULL,8,143,13),(139,NULL,20,141,13),(140,NULL,27,142,13),(141,NULL,60,39,20),(142,NULL,60,40,20),(143,NULL,99,41,20),(144,NULL,66,144,13),(145,NULL,24,145,13),(146,NULL,19,146,13),(147,NULL,12,147,13),(148,NULL,28,140,13),(149,'901-1200',273,42,3),(150,'600-900',335,42,2),(151,'901-1200',385,42,2),(152,'600-900',335,42,1),(153,'901-1200',385,42,1),(154,'600-900',335,42,4),(155,'901-1200',385,42,4),(156,'600-900',635,42,8),(157,'901-1200',685,42,8),(158,'600-900',335,43,1),(159,'901-1200',385,43,1),(160,'600-900',335,43,2),(161,'901-1200',385,43,2),(162,'600-900',241,43,3),(163,'901-1200',273,43,3),(164,'600-900',335,43,4),(165,'901-1200',385,43,4),(166,'600-900',635,43,8),(167,'901-1200',638,43,8),(168,'600-900',361,44,1),(169,'901-1200',394,44,1),(170,'600-900',361,44,2),(171,'901-1200',394,44,2),(172,'600-900',293,44,3),(173,'901-1200',321,44,3),(174,'600-900',361,44,4),(175,'901-1200',394,44,4),(176,'600-900',361,45,1),(177,'901-1200',394,45,1),(178,'600-900',361,45,2),(179,'901-1200',394,45,2),(180,'600-900',293,45,3),(181,'901-1200',321,45,3),(182,'600-900',361,45,4),(183,'901-1200',394,45,4),(184,'600-900',385,46,1),(185,'901-1200',404,46,1),(186,'600-900',385,46,2),(187,'901-1200',404,46,2),(188,'600-900',314,46,3),(189,'901-1200',344,46,3),(190,'600-900',385,46,4),(191,'901-1200',404,46,4),(192,'600-900',385,47,1),(193,'901-1200',404,47,1),(194,'600-900',385,47,2),(195,'901-1200',404,47,2),(196,'600-900',314,47,3),(197,'901-1200',344,47,3),(198,'600-900',385,47,4),(199,'901-1200',404,47,4),(200,'600-900',402,48,1),(201,'901-1200',445,48,1),(202,'600-900',402,48,2),(203,'901-1200',445,48,2),(204,'600-900',336,48,3),(205,'901-1200',370,48,3),(206,'600-900',402,48,4),(207,'901-1200',445,48,4),(208,'600-900',402,49,1),(209,'901-1200',445,49,1),(210,'600-900',402,49,2),(211,'901-1200',445,49,2),(212,'600-900',336,49,3),(213,'901-1200',370,49,3),(214,'600-900',402,49,4),(215,'901-1200',445,49,4),(216,'600-900',427,50,1),(217,'901-1200',449,50,1),(218,'600-900',427,50,2),(219,'901-1200',449,50,2),(220,'600-900',346,50,3),(221,'901-1200',374,50,3),(222,'600-900',427,50,4),(223,'901-1200',449,50,4),(224,'600-900',427,51,1),(225,'901-1200',449,51,1),(226,'600-900',427,51,2),(227,'901-1200',449,51,2),(228,'600-900',346,51,3),(229,'901-1200',374,51,3),(230,'600-900',427,51,4),(231,'901-1200',449,51,4),(232,'600-900',480,52,1),(233,'901-1200',517,52,1),(234,'600-900',480,52,2),(235,'901-1200',517,52,2),(236,'600-900',391,52,3),(237,'901-1200',419,52,3),(238,'600-900',480,52,4),(239,'901-1200',517,52,4),(240,'600-900',480,53,1),(241,'901-1200',517,53,1),(242,'600-900',480,53,2),(243,'901-1200',517,53,2),(244,'600-900',391,53,3),(245,'901-1200',419,53,3),(246,'600-900',480,53,4),(247,'901-1200',517,53,4),(248,'600-900',480,54,1),(249,'901-1200',517,54,1),(250,'600-900',480,54,2),(251,'901-1200',517,54,2),(252,'600-900',391,54,3),(253,'901-1200',419,54,3),(254,'600-900',480,54,4),(255,'901-1200',517,54,4),(256,'600-900',480,55,1),(257,'901-1200',517,55,1),(258,'600-900',480,55,2),(259,'901-1200',517,55,2),(260,'600-900',391,55,3),(261,'901-1200',419,55,3),(262,'600-900',480,55,4),(263,'901-1200',517,55,4),(264,'600-900',427,56,1),(265,'901-1200',449,56,1),(266,'600-900',427,56,2),(267,'901-1200',449,56,2),(268,'600-900',346,56,3),(269,'901-1200',374,56,3),(270,'600-900',427,56,4),(271,'901-1200',449,56,4),(272,'600-900',427,57,1),(273,'901-1200',449,57,1),(274,'600-900',427,57,2),(275,'901-1200',449,57,2),(276,'600-900',346,57,3),(277,'901-1200',374,57,3),(278,'600-900',427,57,4),(279,'901-1200',449,57,4),(280,'600-900',412,58,1),(281,'901-1200',459,58,1),(282,'600-900',412,58,2),(283,'901-1200',459,58,2),(284,'600-900',347,58,3),(285,'901-1200',373,58,3),(286,'600-900',412,58,4),(287,'901-1200',459,58,4),(288,'600-900',412,59,1),(289,'901-1200',459,59,1),(290,'600-900',412,59,2),(291,'901-1200',459,59,2),(292,'600-900',347,59,3),(293,'901-1200',373,59,3),(294,'600-900',412,59,4),(295,'901-1200',459,59,4),(296,'600-900',412,60,1),(297,'901-1200',459,60,1),(298,'600-900',412,60,2),(299,'901-1200',459,60,2),(300,'600-900',347,60,3),(301,'901-1200',373,60,3),(302,'600-900',412,60,4),(303,'901-1200',459,60,4),(304,'600-900',412,61,1),(305,'901-1200',459,61,1),(306,'600-900',412,61,2),(307,'901-1200',459,61,2),(308,'600-900',347,61,3),(309,'901-1200',373,61,3),(310,'600-900',412,61,4),(311,'901-1200',459,61,4),(312,'600-900',479,62,1),(313,'901-1200',523,62,1),(314,'600-900',479,62,2),(315,'901-1200',523,62,2),(316,'600-900',389,62,3),(317,'901-1200',424,62,3),(318,'600-900',479,62,4),(319,'901-1200',523,62,4),(320,'600-900',479,63,1),(321,'901-1200',523,63,1),(322,'600-900',479,63,2),(323,'901-1200',523,63,2),(324,'600-900',389,63,3),(325,'901-1200',424,63,3),(326,'600-900',479,63,4),(327,'901-1200',523,63,4),(328,'600-900',479,64,1),(329,'901-1200',523,64,1),(330,'600-900',479,64,2),(331,'901-1200',523,64,2),(332,'600-900',389,64,3),(333,'901-1200',424,64,3),(334,'600-900',479,64,4),(335,'901-1200',523,64,4),(336,'600-900',479,65,1),(337,'901-1200',523,65,1),(338,'600-900',479,65,2),(339,'901-1200',523,65,2),(340,'600-900',389,65,3),(341,'901-1200',424,65,3),(342,'600-900',479,65,4),(343,'901-1200',523,65,4),(344,'600-900',479,66,1),(345,'901-1200',523,66,1),(346,'600-900',479,66,2),(347,'901-1200',523,66,2),(348,'600-900',389,66,3),(349,'901-1200',424,66,3),(350,'600-900',479,66,4),(351,'901-1200',523,66,4),(352,'600-900',479,67,1),(353,'901-1200',523,67,1),(354,'600-900',479,67,2),(355,'901-1200',523,67,2),(356,'600-900',389,67,3),(357,'901-1200',424,67,3),(358,'600-900',479,67,4),(359,'901-1200',523,67,4),(360,'600-900',479,68,1),(361,'901-1200',523,68,1),(362,'600-900',479,68,2),(363,'901-1200',523,68,2),(364,'600-900',389,68,3),(365,'901-1200',424,68,3),(366,'600-900',479,68,4),(367,'901-1200',523,68,4),(368,'600-900',479,69,1),(369,'901-1200',523,69,1),(370,'600-900',479,69,2),(371,'901-1200',523,69,2),(372,'600-900',389,69,3),(373,'901-1200',424,69,3),(374,'600-900',479,69,4),(375,'901-1200',523,69,4),(376,'600-900',608,70,1),(377,'901-1200',628,70,1),(378,'600-900',608,70,2),(379,'901-1200',628,70,2),(380,'600-900',494,70,3),(381,'901-1200',510,70,3),(382,'600-900',608,70,4),(383,'901-1200',628,70,4),(384,'600-900',608,71,1),(385,'901-1200',628,71,1),(386,'600-900',608,71,2),(387,'901-1200',628,71,2),(388,'600-900',494,71,3),(389,'901-1200',510,71,3),(390,'600-900',608,71,4),(391,'901-1200',628,71,4),(392,'600-900',608,72,1),(393,'901-1200',628,72,1),(394,'600-900',608,72,2),(395,'901-1200',628,72,2),(396,'600-900',494,72,3),(397,'901-1200',510,72,3),(398,'600-900',608,72,4),(399,'901-1200',628,72,4),(400,'600-900',608,73,1),(401,'901-1200',628,73,1),(402,'600-900',608,73,2),(403,'901-1200',628,73,2),(404,'600-900',494,73,3),(405,'901-1200',510,73,3),(406,'600-900',608,73,4),(407,'901-1200',628,73,4),(408,'600-900',608,74,1),(409,'901-1200',628,74,1),(410,'600-900',608,74,2),(411,'901-1200',628,74,2),(412,'600-900',494,74,3),(413,'901-1200',510,74,3),(414,'600-900',608,74,4),(415,'901-1200',628,74,4),(416,'600-900',608,75,1),(417,'901-1200',628,75,1),(418,'600-900',608,75,2),(419,'901-1200',628,75,2),(420,'600-900',494,75,3),(421,'901-1200',510,75,3),(422,'600-900',608,75,4),(423,'901-1200',628,75,4),(424,'600-900',608,76,1),(425,'901-1200',628,76,1),(426,'600-900',608,76,2),(427,'901-1200',628,76,2),(428,'600-900',494,76,3),(429,'901-1200',510,76,3),(430,'600-900',608,76,4),(431,'901-1200',628,76,4),(432,'600-900',608,77,1),(433,'901-1200',628,77,1),(434,'600-900',608,77,2),(435,'901-1200',628,77,2),(436,'600-900',494,77,3),(437,'901-1200',510,77,3),(438,'600-900',608,77,4),(439,'901-1200',628,77,4),(440,'600-900',608,78,1),(441,'901-1200',628,78,1),(442,'600-900',608,78,2),(443,'901-1200',628,78,2),(444,'600-900',494,78,3),(445,'901-1200',510,78,3),(446,'600-900',608,78,4),(447,'901-1200',628,78,4),(448,'600-900',608,79,1),(449,'901-1200',628,79,1),(450,'600-900',608,79,2),(451,'901-1200',628,79,2),(452,'600-900',494,79,3),(453,'901-1200',510,79,3),(454,'600-900',608,79,4),(455,'901-1200',628,79,4),(456,'600-900',608,80,1),(457,'901-1200',628,80,1),(458,'600-900',608,80,2),(459,'901-1200',628,80,2),(460,'600-900',494,80,3),(461,'901-1200',510,80,3),(462,'600-900',608,80,4),(463,'901-1200',628,80,4),(464,'600-900',608,81,1),(465,'901-1200',628,81,1),(466,'600-900',608,81,2),(467,'901-1200',628,81,2),(468,'600-900',494,81,3),(469,'901-1200',510,81,3),(470,'600-900',608,81,4),(471,'901-1200',628,81,4),(472,'600-900',608,82,1),(473,'901-1200',628,82,1),(474,'600-900',608,82,2),(475,'901-1200',628,82,2),(476,'600-900',494,82,3),(478,'901-1200',510,82,3),(479,'600-900',608,82,4),(480,'901-1200',628,82,4),(481,'600-900',608,83,1),(482,'901-1200',628,83,1),(483,'600-900',608,83,2),(484,'901-1200',628,83,2),(485,'600-900',494,83,3),(486,'901-1200',510,83,3),(487,'600-900',608,83,4),(488,'901-1200',628,83,4),(489,'600-900',479,84,1),(490,'901-1200',523,84,1),(491,'600-900',479,84,2),(492,'901-1200',523,84,2),(493,'600-900',389,84,3),(494,'901-1200',424,84,3),(495,'600-900',479,84,4),(496,'901-1200',523,84,4),(497,'600-900',479,85,1),(498,'901-1200',523,85,1),(499,'600-900',479,85,2),(500,'901-1200',523,85,2),(501,'600-900',389,85,3),(502,'901-1200',424,85,3),(503,'600-900',479,85,4),(504,'901-1200',523,85,4),(505,'600-900',377,88,2),(506,'901-1200',391,88,2),(507,'600-900',377,89,2),(508,'901-1200',391,89,2),(509,'600-900',377,90,2),(510,'901-1200',391,90,2),(511,'600-900',377,91,2),(512,'901-1200',391,91,2),(513,'600-900',377,92,2),(514,'901-1200',391,92,2),(515,'600-900',377,93,2),(516,'901-1200',391,93,2),(517,'600-900',377,94,2),(518,'901-1200',391,94,2),(519,'600-900',377,95,2),(520,'901-1200',391,95,2),(521,'600-900',377,96,2),(522,'901-1200',391,96,2),(523,'600-900',377,97,2),(524,'901-1200',391,97,2),(525,'600-900',450,98,2),(526,'901-1200',489,98,2),(527,'600-900',450,99,2),(528,'901-1200',489,99,2),(529,'600-900',377,100,2),(530,'901-1200',391,100,2),(531,'600-900',377,101,2),(532,'901-1200',391,101,2),(533,'600-900',377,102,2),(534,'901-1200',391,102,2),(535,'600-900',377,103,2),(536,'901-1200',391,103,2),(537,'600-900',387,104,2),(538,'901-1200',405,104,2),(539,'600-900',387,105,2),(540,'901-1200',405,105,2),(541,'600-900',387,106,2),(542,'901-1200',405,106,2),(543,'600-900',387,107,2),(544,'901-1200',405,107,2),(545,'300-450',231,210,1),(546,'451-600',247,210,1),(547,'300-450',224,210,2),(548,'451-600',241,210,2),(549,'300-450',142,210,3),(550,'451-600',147,210,3),(551,'451-600',183,196,3),(552,'601-900',262,197,3),(553,'901-1200',299,198,3),(554,NULL,414,109,3),(555,NULL,188,116,3),(556,NULL,225,199,3),(557,NULL,299,200,3),(558,NULL,345,201,3),(559,NULL,477,117,3),(560,'350-450',25,110,5),(561,'451-600',32,110,5),(562,'601-900',38,110,5),(563,'901-1200',44,110,5),(564,'300-450',60,111,5),(565,'451-600',83,111,5),(566,'901-1200',138,111,5),(567,'1200-1200',86,112,5),(568,'Hasta 600',107,113,5),(569,'601-900',115,113,5),(570,'901-1200',130,113,5),(571,'300-450 (400mm Prof)',42,114,5),(572,'300-450 (600mm Prof)',61,114,5),(573,'451-600 (400mm Prof)',47,114,5),(574,'451-600 (600mm Prof)',69,114,5),(575,'601-900 (400mm Prof)',53,114,5),(576,'601-900 (600mm Prof)',72,114,5),(577,'901-1200 (400mm Prof)',59,114,5),(578,'901-1200 (600mm Prof)',81,114,5),(579,'Hasta 500',29,115,5),(580,'501-1500',51,115,5),(581,'1501-2000',85,115,5),(582,'2001-2500',104,115,5),(583,'451-600',48,118,5),(584,'601-900',55,118,5),(585,'901-1200',60,118,5),(586,'300-450',75,119,5),(587,'451-600',98,119,5),(588,'601-900',125,119,5),(589,'901-1200',153,119,5),(590,'1200-1200',109,120,5),(591,'Hasta 600',130,121,5),(592,'601-900',145,121,5),(593,'901-1200',159,121,5),(594,'300-450 (400mm Prof)',46,122,5),(595,'300-450 (600mm Prof)',62,122,5),(596,'451-600 (400mm Prof)',50,122,5),(597,'451-600 (600mm Prof)',67,122,5),(598,'601-900 (400mm Prof)',54,122,5),(599,'601-900 (600mm Prof)',70,122,5),(600,'901-1200 (400mm Prof)',60,122,5),(601,'901-1200 (600mm Prof)',77,122,5),(602,'Hasta 500',45,123,5),(603,'501-1500',70,123,5),(604,'1501-2000',104,123,5),(605,'2001-2500',137,123,5),(606,NULL,107,184,5),(607,NULL,161,185,5),(608,NULL,217,186,5),(609,NULL,14,187,5),(610,NULL,73,188,5),(611,NULL,63,189,5),(612,'Hasta 600',75,157,5),(613,'601-900',90,157,5),(614,'Hasta 600',85,158,5),(615,'601-900',102,158,5),(616,'901-1200',115,158,5),(617,'Hasta 600 (100-200)',130,159,5),(618,'Hasta 600 (201-300)',148,159,5),(619,'601-900 (100-200)',150,159,5),(620,'601-900 (201-300)',168,159,5),(621,'901-1200 (100-200)',170,159,5),(622,'901-1200 (201-300)',188,159,5),(623,'Hasta 600 (100-200)',153,160,5),(624,'Hasta 600 (201-300)',170,160,5),(625,'601-900 (100-200)',171,160,5),(626,'601-900 (201-300)',189,160,5),(627,'901-1200 (100-200)',196,160,5),(628,'901-1200 (201-300)',220,160,5),(629,'Hasta 600',107,161,5),(630,'601-900',115,161,5),(631,'901-1200',130,161,5),(632,'Hasta 600',39,162,5),(633,'601-900',48,162,5),(634,'901-1200',73,162,5),(635,'601-900',287,163,5),(636,'901-1200',356,163,5),(637,'Otras medidas',268,164,5),(638,'F400',107,165,5),(639,'F500',107,165,5),(640,'F400',156,166,5),(641,'F500',156,166,5),(642,'400-600',149,167,5),(643,'600-10009',149,167,5),(644,'800-1200',149,167,5),(645,'F300',49,211,5),(646,'F360',54,211,5),(647,'F420',58,211,5),(648,'',NULL,NULL,NULL),(649,'Otras medidas',109,168,5),(650,'Otras medidas',195,169,5),(651,'464 (514mm * 455 * 90)',144,170,5),(652,'564 (614*455*90)',159,170,5),(653,'664 (714*455*90)',173,170,5),(654,'764 (814*455*90)',193,170,5),(655,'864 (914*455*90)',215,170,5),(656,'964 (1014*455*90)',242,170,5),(657,'343*453*115',129,171,5),(658,'670*453*115',178,172,5),(659,'355*453*115',124,173,5),(660,'464 (514mm * 455 * 90)',287,174,5),(661,'564 (614*455*90)',301,174,5),(662,'664 (714*455*90)',320,174,5),(663,'764 (814*455*90)',345,174,5),(664,'864 (914*455*90)',376,174,5),(665,'964 (1014*455*90)',412,174,5),(666,'464 (514mm * 455 * 90)',245,175,5),(667,'564 (614*455*90)',253,175,5),(668,'664 (714*455*90)',261,175,5),(669,'764 (814*455*90)',276,175,5),(670,'864 (914*455*90)',290,175,5),(671,'964 (1014*455*90)',304,175,5),(672,'464 (514mm * 455 * 90)',215,176,5),(673,'564 (614*455*90)',229,176,5),(674,'664 (714*455*90)',248,176,5),(675,'764 (814*455*90)',271,176,5),(676,'864 (914*455*90)',295,176,5),(677,'964 (1014*455*90)',323,176,5),(678,'464 (514mm * 455 * 90)',151,177,5),(679,'564 (614*455*90)',159,177,5),(680,'664 (714*455*90)',170,177,5),(681,'764 (814*455*90)',182,177,5),(682,'864 (914*455*90)',194,177,5),(683,'964 (1014*455*90)',209,177,5),(684,'464 (514mm * 455 * 90)',137,178,5),(685,'564 (614*455*90)',141,178,5),(686,'664 (714*455*90)',147,178,5),(687,'764 (814*455*90)',153,178,5),(688,'864 (914*455*90)',159,178,5),(689,'864 (914*455*90)',165,178,5),(690,'464 (514mm * 455 * 90)',141,179,5),(691,'564 (614*455*90)',154,179,5),(692,'664 (714*455*90)',168,179,5),(693,'764 (814*455*90)',182,179,5),(694,'864 (914*455*90)',196,179,5),(695,'964 (1014*455*90)',211,179,5),(696,'115*453*115',107,180,5),(697,'450-600',196,181,5),(698,'600-830',196,181,5),(699,'830-1150',196,181,5);
/*!40000 ALTER TABLE `medidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuesto`
--

DROP TABLE IF EXISTS `presupuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presupuesto` (
  `idPresupuestos` int NOT NULL AUTO_INCREMENT,
  `Centro` varchar(45) NOT NULL,
  `Puntos` double DEFAULT NULL,
  `Tienda` varchar(45) DEFAULT NULL,
  `Cliente` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPresupuestos`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuesto`
--

LOCK TABLES `presupuesto` WRITE;
/*!40000 ALTER TABLE `presupuesto` DISABLE KEYS */;
INSERT INTO `presupuesto` VALUES (1,'Nombre del centro',1200.5,'Tienda XYZ','Cliente ABC'),(2,'Nombre del centro',1200.5,'Tienda XYZ','Cliente ABC'),(3,'Nombre del centro',41.96,'Tienda XYZ','Cliente ABC'),(4,'Nombre del centro',350,'Tienda XYZ','Cliente ABC'),(5,'Nombre del centro',37,'Tienda XYZ','Cliente ABC'),(6,'AELE Beniparrell',470,'Tienda XYZ','Cliente ABC'),(7,'AELE Beniparrell',499,'ssaa','dadsads'),(8,'AELE Beniparrell',26,'sdasdad','adsadsasdad'),(9,'AELE Beniparrell',26,'asdasdads','asdasdasd'),(10,'AELE Beniparrell',299,'asdad','asfa'),(11,'AELE Beniparrell',51,'saasd','adsadsads'),(12,'AELE Beniparrell',1621,'sdad','adasda'),(13,'AELE Beniparrell',1717.408,'asdasdads','asdwdasd'),(14,'AELE Beniparrell',2542,'dfsdfas','adsada'),(15,'AELE Beniparrell',2663,'asdasda','asdasdasdasd'),(16,'AELE Beniparrell',1301,'asdasda','asdasdas'),(17,'AELE Beniparrell',1990,'asfadsewdds','adsadsasd'),(18,'AELE Beniparrell',875,'szasddasda','asdadadsa'),(19,'AELE Beniparrell',1383,'sdsadad','Samuel'),(20,'AELE Beniparrell',1725,'Aele','adsyuasd'),(21,'AELE Beniparrell',150,'sdfsds','adada'),(22,'AELE Beniparrell',358,'srts','fsfs'),(23,'AELE Beniparrell',450,'dwasdasda','qwsadasd'),(24,'AELE Beniparrell',179,'shjais','Samuel'),(25,'Leroy Merlin',9141.6,'asdad','asdasd'),(26,'Leroy Merlin',2080,'sdfsds','adsadsa'),(27,'Leroy Merlin',231,'sdasda','sadsada'),(28,'Leroy Merlin',494,'asddddddas','asdadsas'),(29,'Leroy Merlin',652,'asdaf','sadadsa'),(30,'Leroy Merlin',297,'sadfsgfdesd','adsgsd'),(31,'Leroy Merlin',369,'sdfasfa','rtty'),(32,'Leroy Merlin',898,'asdad','gtrefwes'),(33,'Leroy Merlin',1256,'asdasd','asdasdef'),(34,'Leroy Merlin',304,'asdadad','dsfdgfrdfd'),(35,'Leroy Merlin',392,'watesrdhgkj','sfdscbna'),(36,'Leroy Merlin',398,'asdasds','asdadsa'),(37,'Leroy Merlin',326,'qwdad','qewqdas'),(38,'Leroy Merlin',829,'sdfwedwdsd','sdsdsd'),(39,'Leroy Merlin',579,'xczcxas','dzczcas'),(40,'Leroy Merlin',288,'werwfs','fwefsdf'),(41,'Leroy Merlin',1467,'Leroy Cartagena','Samuel'),(42,'Leroy Merlin',12,'wdasdasd','erwfdf'),(43,'Leroy Merlin',217,'sdad','asdadads'),(44,'Leroy Merlin',448,'scdada','sadad'),(45,'Leroy Merlin',671,'adwdadw','ssaerhdfg'),(46,'Leroy Merlin',5117.6,'Tienda Ejemplo','Samuel'),(47,'Leroy Merlin',1296.2,'SDghajsdas','dsgsfhsasd'),(48,'Leroy Merlin',1707.2,'SDghajsdas','dsgsfhsasd'),(49,'Leroy Merlin',1645,'sadyuajkdf','dhfffffff'),(50,'Leroy Merlin',1837,'sadyuajkdf','dhfffffff'),(51,'Leroy Merlin',2727,'sadyuajkdf','dhfffffff'),(52,'Leroy Merlin',2571,'sadsda','sdfsdg'),(53,'Leroy Merlin',2571,'sadsda','sdfsdg'),(54,'Leroy Merlin',4741.6,'esgrdfwdsf','gresdgrtfhg'),(55,'Leroy Merlin',5321.6,'esgrdfwdsf','gresdgrtfhg'),(56,'Leroy Merlin',513,'qweqe','qweqre'),(57,'Leroy Merlin',3274,'wegsfe','sefsfs'),(58,'Leroy Merlin',3942,'wegsfe','sefsfs'),(59,'Leroy Merlin',59562,'wd','dwefdw'),(60,'Leroy Merlin',1134,'adsasd','asdads'),(61,'Leroy Merlin',5928,'adsasd','asdads'),(62,'Leroy Merlin',2446,'qefsgrtfhkyutraq','efsgrdwaefsdgffa'),(63,'Leroy Merlin',378,'sfdgd','fesfsed'),(64,'Leroy Merlin',1361,'q3rwtyue','rwetyj'),(65,'Leroy Merlin',2231,'afstfhlj','esl'),(66,'Leroy Merlin',187,'awfsdgh','sdfg'),(67,'Leroy Merlin',3475,'awfsdgh','sdfg'),(68,'Leroy Merlin',9728,'rwerthj','trytuyuiop'),(69,'Leroy Merlin',3287,'t4etryukj','gtrhj'),(70,'Leroy Merlin',4049,'qwerty','wergthj'),(71,'Leroy Merlin',6881.8,'qwerty','wergthj'),(72,'Leroy Merlin',3151,'`poiuytr','67turhyetrw'),(73,'Leroy Merlin',256,'fgtrhj','ewfsghmj');
/*!40000 ALTER TABLE `presupuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Frentes Abatibles'),(2,'Tiradores'),(3,'Cerraduras'),(4,'Frentes correderos MINIME'),(5,'Frentes correderos A00'),(6,'Interiores'),(7,'Equipamiento'),(8,'Especiales a medida (interiores)'),(9,'Especiales a medida (frentes)'),(10,'Remates');
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
INSERT INTO `serie` VALUES (1,1,1,'Face','face',NULL),(4,1,0,'contemporanea','abatible',NULL),(5,1,0,'aspas','abatible',NULL),(6,1,0,'provenzal','abatible',NULL),(7,1,0,'serieFormas','abatible',NULL),(8,2,0,'Tirador1','tirador',NULL),(9,3,0,'cerradura','cerradura',NULL),(10,4,0,'uniforme','correderaMINIME',NULL),(11,5,0,'uniforme','correderaA00',NULL),(12,4,1,'serieOne','correderaMINIME',NULL),(13,5,1,'serieOne','correderaA00',NULL),(14,4,1,'serieDuo','correderaMINIME',NULL),(15,5,1,'serieDuo','correderaA00',NULL),(16,4,1,'serieMulty','correderaMINIME',NULL),(17,5,1,'serieMulty','correderaA00',NULL),(18,4,1,'serieVerty','correderaMINIME',NULL),(19,5,1,'serieVerty','correderaA00',NULL),(22,4,0,'serieFormas','correderaMINIME',NULL),(23,5,0,'serieFormas','correderaA00',NULL),(24,4,0,'serieProvenzal','correderaMINIME',NULL),(25,5,0,'serieProvenzal','correderaA00',NULL),(26,6,0,'vestidores','vestidores',NULL),(27,6,0,'baldas','baldas',NULL),(28,6,0,'divisores','divisor',NULL),(30,1,0,'kanto','abatible',NULL),(31,6,0,'iluminacion','iluminacion',NULL),(32,7,0,'equipamientos','equipamiento',NULL),(33,7,0,'antracita','equipamiento',NULL),(34,8,0,'especial','interior',NULL),(35,9,0,'especial','frente',NULL),(37,10,0,'remates','remates',NULL),(38,1,0,'vitrina','abatible',NULL);
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
INSERT INTO `serie_material` VALUES (1,1),(2,1),(3,1),(4,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(30,1),(36,1),(37,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(30,2),(36,2),(37,2),(1,3),(2,3),(3,3),(10,3),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(21,3),(26,3),(30,3),(36,3),(37,3),(1,4),(2,4),(3,4),(4,4),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,4),(18,4),(19,4),(20,4),(21,4),(36,4),(26,5),(27,5),(28,5),(31,5),(32,5),(33,5),(34,5),(35,5),(10,8),(11,8),(29,8),(38,8),(8,9),(9,20);
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

-- Dump completed on 2024-09-18  7:18:07

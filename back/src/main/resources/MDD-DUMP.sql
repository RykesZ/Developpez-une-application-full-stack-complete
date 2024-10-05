-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mdd
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_topic` (`topic_id`),
  KEY `fk_article_author` (`author_id`),
  CONSTRAINT `fk_article_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_article_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (25,4,1,'Introduction à Angular','Angular est un framework JavaScript complet qui permet de créer des applications web complexes de manière structurée et modulaire. Utilisé pour le développement côté client, il propose des fonctionnalités telles que le data binding, l\'injection de dépendance, ainsi qu\'un moteur de templating performant. Il est largement adopté pour les applications à grande échelle grâce à sa robustesse et sa capacité à gérer les interfaces utilisateur interactives. Avec Angular, vous pouvez créer des Single Page Applications (SPA) en un temps record.','2023-12-19 23:00:00','2024-03-11 23:00:00'),(26,5,2,'Pourquoi choisir React ?','React est une bibliothèque JavaScript maintenue par Facebook pour construire des interfaces utilisateur. Grâce à son approche déclarative, elle permet de créer des composants réutilisables et d\'organiser le code de façon modulaire. Le concept de \"virtual DOM\" qu\'elle introduit optimise le rendu des pages web, rendant React particulièrement efficace pour les applications nécessitant de nombreuses mises à jour d\'interface. C\'est un choix privilégié pour les développeurs recherchant simplicité, performance et flexibilité.','2024-06-16 22:00:00','2024-03-09 23:00:00'),(27,2,3,'Vue.js : un framework léger et flexible','Vue.js est un framework JavaScript progressif qui facilite la création d\'interfaces utilisateur. Sa courbe d\'apprentissage douce le rend accessible aux débutants, tout en offrant la puissance nécessaire pour construire des applications complexes. Vue se distingue par sa capacité à être intégré de manière incrémentale dans des projets existants ou à être utilisé pour développer des SPAs. Avec un écosystème en croissance constante, Vue est aujourd\'hui très populaire parmi les développeurs web.','2023-12-10 23:00:00','2024-07-22 22:00:00'),(28,2,4,'Découvrir Node.js','Node.js est un environnement d\'exécution JavaScript côté serveur, conçu pour construire des applications réseau rapides et évolutives. Basé sur le moteur V8 de Google Chrome, il permet aux développeurs d\'utiliser JavaScript sur le back-end, créant ainsi un environnement de développement homogène pour le front-end et le back-end. Node.js excelle dans les applications nécessitant des connexions simultanées, comme les serveurs de chat, les API temps réel, et bien plus encore.','2024-09-05 22:00:00','2024-04-23 22:00:00'),(29,2,5,'Python : le langage polyvalent','Python est un langage de programmation polyvalent et puissant, connu pour sa syntaxe simple et lisible. Il est utilisé dans divers domaines tels que le développement web, la science des données, l\'intelligence artificielle et le développement de scripts automatisés. Grâce à son écosystème de bibliothèques et à sa communauté active, Python est souvent le langage de choix pour les projets nécessitant rapidité de prototypage et grande lisibilité du code.','2024-04-03 22:00:00','2024-06-10 22:00:00'),(30,2,6,'Introduction au Machine Learning','Le Machine Learning est une branche de l\'intelligence artificielle qui permet aux machines d\'apprendre à partir de données sans être explicitement programmées. Grâce à des algorithmes mathématiques, les systèmes peuvent détecter des motifs dans les données, faire des prédictions ou prendre des décisions basées sur ces analyses. Utilisé dans des domaines variés, du traitement du langage naturel à la vision par ordinateur, le Machine Learning est aujourd\'hui essentiel à de nombreuses applications d\'IA.','2024-06-12 22:00:00','2024-01-24 23:00:00'),(31,1,1,'Maîtriser Angular pour le front-end','Angular, avec ses directives puissantes et son architecture en composants, facilite la construction de grandes applications front-end. Ses modules permettent de structurer le code, tandis que les services injectables offrent une séparation claire des préoccupations. Angular CLI, son outil en ligne de commande, accélère le développement en générant des composants, des services et des modules prêts à l\'emploi. Ce framework est idéal pour les développeurs recherchant performance et modularité.','2024-02-20 23:00:00','2024-03-16 23:00:00'),(32,5,4,'Node.js : écrire des applications rapides et performantes','Avec Node.js, les développeurs peuvent écrire des applications serveur en utilisant JavaScript, le même langage que pour le front-end. Cela permet un partage de code plus fluide et une courbe d\'apprentissage réduite pour les nouveaux développeurs. Node.js est basé sur un modèle d\'exécution non-bloquant, ce qui le rend idéal pour les applications temps réel et les API légères. Apprenez à exploiter sa puissance pour construire des applications évolutives.','2023-12-17 23:00:00','2024-03-12 23:00:00'),(33,6,2,'Un test pour React','Ceci est un texte qui sert de place-holder pour le test de création d\'un article.','2024-10-04 10:55:29','2024-10-04 10:55:29');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_article` (`article_id`),
  KEY `fk_comment_author` (`author_id`),
  CONSTRAINT `fk_comment_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_comment_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,25,2,'Super article sur Angular, j\'ai appris beaucoup de choses ! Je ne savais pas que c\'était aussi puissant pour le développement frontend.','2024-07-15 08:35:21','2024-07-15 08:35:21'),(2,25,4,'Je suis d\'accord avec les points abordés, mais il manque quelques astuces sur la gestion des formulaires.','2024-07-16 12:12:09','2024-07-16 12:15:42'),(3,26,1,'React est vraiment impressionnant, merci pour cet article détaillé ! J\'aimerais en savoir plus sur les hooks.','2024-08-02 07:45:32','2024-08-02 07:45:32'),(4,26,3,'Bien expliqué, mais l\'exemple pourrait être plus complet en utilisant Context API.','2024-08-03 15:32:58','2024-08-03 15:45:12'),(5,27,6,'Vue.js a un design très intuitif et est facile à prendre en main. Merci pour l\'article.','2024-04-12 10:25:14','2024-04-12 10:30:10'),(6,27,5,'Est-ce que tu pourrais détailler un peu plus l\'utilisation de Vuex ? Ça m\'intéresserait !','2024-04-13 13:54:02','2024-04-13 14:01:34'),(7,28,1,'Node.js est le meilleur pour construire des applications serveur. Excellent article !','2024-02-19 07:14:45','2024-02-19 07:20:30'),(8,28,3,'Je ne connaissais pas certaines fonctionnalités de Node.js. C\'était super intéressant !','2024-02-20 12:11:27','2024-02-20 12:25:15'),(9,29,4,'Python est vraiment polyvalent, merci pour cet article !','2024-03-05 08:22:16','2024-03-05 08:30:45'),(10,29,6,'Bien rédigé, mais il manque quelques précisions sur les librairies scientifiques.','2024-03-06 10:14:32','2024-03-06 10:20:58'),(11,30,2,'Le machine learning est complexe, mais ton article m\'a aidé à mieux comprendre les bases.','2024-06-11 12:45:27','2024-06-11 12:50:40'),(12,30,5,'Super introduction au machine learning, merci pour ce contenu clair !','2024-06-12 08:34:11','2024-06-12 08:45:35'),(13,31,3,'J\'adore Angular, merci pour cet article qui m\'a donné de nouvelles idées de projet.','2024-05-09 11:23:45','2024-05-09 11:30:59'),(14,31,1,'Bien expliqué, j\'aimerais en voir plus sur les directives personnalisées.','2024-05-10 13:11:20','2024-05-10 13:20:33'),(15,32,4,'Node.js est puissant, mais il faut faire attention à la gestion de mémoire. Bon article !','2024-09-12 16:24:33','2024-09-12 16:30:57'),(16,32,2,'Merci pour les informations sur Node.js, ça m\'a aidé à corriger certains problèmes.','2024-09-13 14:22:18','2024-09-13 14:25:40'),(17,31,6,'Génial','2024-09-30 18:42:02','2024-09-30 18:42:02'),(18,31,6,'J\'adore','2024-09-30 18:58:07','2024-09-30 18:58:07'),(19,33,6,'Ceci est un commentaire de test','2024-10-04 10:56:28','2024-10-04 10:56:28');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'Angular','Framework JavaScript pour création d\'applications web','2024-09-29 14:58:18','2024-09-29 14:58:18'),(2,'React','Bibliothèque JavaScript pour interfaces utilisateur','2024-09-29 14:58:18','2024-09-29 14:58:18'),(3,'Vue.js','Framework progressif pour construire des interfaces utilisateur','2024-09-29 14:58:18','2024-09-29 14:58:18'),(4,'Node.js','Environnement d\'exécution JavaScript côté serveur','2024-09-29 14:58:18','2024-09-29 14:58:18'),(5,'Python','Langage de programmation polyvalent et puissant','2024-09-29 14:58:18','2024-09-29 14:58:18'),(6,'Machine Learning','Sous-domaine de l\'intelligence artificielle','2024-09-29 14:58:18','2024-09-29 14:58:18');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_topic_subscriptions`
--

DROP TABLE IF EXISTS `user_topic_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_topic_subscriptions` (
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `user_topic_subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_topic_subscriptions_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_topic_subscriptions`
--

LOCK TABLES `user_topic_subscriptions` WRITE;
/*!40000 ALTER TABLE `user_topic_subscriptions` DISABLE KEYS */;
INSERT INTO `user_topic_subscriptions` VALUES (1,1),(6,1),(6,2),(6,3),(1,4),(1,5);
/*!40000 ALTER TABLE `user_topic_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'utilisateur1@gmail.com','utilisateur1','$2a$10$loGgh7sBrUj800QvJq9PLuT8pOQ.pD41PRRfsT3wqovmTUNG3S8Ya','2024-09-27 13:39:35','2024-09-27 13:39:35'),(2,'utilisateur2@gmail.com','utilisateur2','$2a$10$mNGxaRcsT6fl4Ntws//okewC4BQRwPGl0HnctJapOB8Zs7wCpwxpO','2024-09-30 17:15:47','2024-09-30 17:15:47'),(3,'utilisateur3@gmail.com','utilisateur3','$2a$10$1VNHJFRt5/539FrxAhemEe6fvrYqWRjawfMefb8w0xXksKWcY7YAy','2024-09-30 17:17:02','2024-09-30 17:17:02'),(4,'utilisateur4@gmail.com','utilisateur4','$2a$10$R802CggR.jqQ.e2L44VR9OxBVbYLkE7y.ofz7uVCOxMRq1a6dPvj.','2024-09-30 17:17:19','2024-09-30 17:17:19'),(5,'utilisateur5@gmail.com','utilisateur5','$2a$10$iHj0QnSWl96B9fXEacXhXepycqQTBEjLpZ7qABZRt5qSt/vl570Wu','2024-09-30 17:17:40','2024-09-30 17:17:40'),(6,'utilisateur6@gmail.com','utilisateur6','$2a$10$0uRHHDgUChVIMsWLsM9VDuaJWKTWAJDMQn82xJVld6P6kyKfJ96XO','2024-09-30 17:17:59','2024-09-30 17:17:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mdd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-04 16:06:05

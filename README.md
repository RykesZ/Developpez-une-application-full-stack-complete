# README - Projet Réseau Social MDD

## Description

Ce projet est une application de réseau social nommée MDD. Elle se compose de deux parties :
- Un back-end développé avec Spring Boot (Java)
- Un front-end construit avec Angular (TypeScript)

Le back-end gère les opérations de base de données et les services de l'application, tandis que le front-end fournit une interface utilisateur interactive pour la gestion des articles, des utilisateurs, et des interactions sociales.

## Prérequis

### Pour le Back-End
- Java JDK version 22
- Maven version 3.6 ou supérieure
- MySQL (version compatible avec MySQL Connector 8.0.33)
- Spring Boot version 3.2.4 (gérée automatiquement via Maven)

### Pour le Front-End
- Node.js version 16 ou supérieure
- npm (gestionnaire de paquets pour Node.js)
- Angular CLI version 18.2.4 (installer globalement si nécessaire)

## Installation

### 1. Configuration de la Base de Données

1. Créez une base de données nommée `mdd` dans votre instance MySQL.
2. Importez le fichier de configuration de la base de données :
   - Exécutez le script SQL situé dans `back/src/main/resources/MDD-DUMP.sql` pour créer les tables nécessaires et insérer des données de test.
3. Dans le répertoire `back/src/main/resources`, copiez le fichier `.env.template` et renommez-le en `.env`.
4. Modifiez le fichier `.env` pour indiquer les informations suivantes :
   - `DB_URL` : URL de connexion à la base de données (par exemple, `jdbc:mysql://localhost:3306/mdd`)
   - `DB_USERNAME` : Nom d'utilisateur MySQL utilisé pour se connecter à la base de données.
   - `DB_PASSWORD` : Mot de passe associé à ce nom d'utilisateur.

### 2. Installation des Dépendances du Back-End

1. Ouvrez un terminal dans le dossier `back` du projet.
2. Exécutez la commande suivante pour installer les dépendances Maven :
   ```bash
   mvn install
   ```

### 3. Installation des Dépendances du Front-End

1. Ouvrez un terminal dans le dossier `front` du projet.
2. Exécutez la commande suivante pour installer les dépendances npm :
   ```bash
   npm install
   ```

## Lancement de l'Application

### 1. Lancer le Back-End

Dans le répertoire `back`, lancez le projet Spring Boot avec la commande suivante :
```bash
mvn spring-boot:run
```

Le back-end démarre par défaut sur le port 3001. Vous pouvez tester l'API en accédant à l'URL suivante dans votre navigateur ou avec un outil comme Postman :

```
http://localhost:3001
```

### 2. Lancer le Front-End

Dans le répertoire `front`, lancez le serveur Angular avec la commande suivante :
```bash
ng serve
```

Le front-end démarre par défaut sur le port 4200. Accédez à l'URL suivante dans votre navigateur :

```
http://localhost:4200
```

## Fonctionnalités

Le réseau social MDD permet aux utilisateurs de :
- Créer un compte et s'authentifier.
- Publier des articles.
- Commenter les articles.
- Consulter les profils d'autres utilisateurs.

## Structure du Projet

- `front/` : Contient le code source du front-end (Angular).
- `back/` : Contient le code source du back-end (Spring Boot).
- `back/src/main/resources/MDD-DUMP.sql` : Script SQL pour la création de la base de données et des tables initiales.
- `back/src/main/resources/.env.template` : Modèle de fichier de configuration pour les paramètres de la base de données.

## Problèmes Courants

### Erreurs de Connexion à la Base de Données
- Vérifiez que les informations de connexion dans le fichier `.env` sont correctes (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
- Assurez-vous que le service MySQL est en cours d'exécution et que la base de données `mdd` existe.

### Port Déjà Utilisé
- Si le port 3001 (back-end) ou 4200 (front-end) est déjà utilisé, changez le port dans le fichier de configuration de l'application (`application.properties` pour le back-end, et `angular.json` pour le front-end).

## Contributeurs

- Développeur Back-End : Heidi
- Développeur Front-End : [Nom du développeur Front-End]
- Designer UX/UI : Juana

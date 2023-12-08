# Rapport du Projet d'application de notes

## Introduction

Cette note détail les choix techniques pour le developpement de cette application, son architecture, les bonus réalisé ainsi que les instructions sur la procédure d'installation et de lancement du projet.

## Choix Techniques

### Backend

- **Node.js** : 
    - **Raison du choix** : J'ai choisi NodeJS pour sa performance et son accès au bibliothéque comme Sequelize et express qui permettent de developper rapidement des server API relié à une base.

- **Sequelize** : 
    - **Raison du choix** : Sequelize est un ORM pour Node.js qui supporte le SQL. J'ai choisit son utilisation de par sa facilité d'utilisation, sa capacité à automatiser le processus de création de requêtes SQL.

### Frontend

- **Vue.js** : 
    - **Raison du choix** : Vue.js est un framework de construction d'interfaces utilisateur. C'est un système réactif et composable qui en fait choix idéal pour développer rapidement des applications frontend.

### Conclusion

L'utilisation de Node.js, Sequelize et Vue.js est une stack cohérente pour le développement fullstack d'une application de ce type.

## Mise en Œuvre et Fonctionnalités

### Fonctionnalités de Base

- Création d'un utilisateur (pseudo, email, mot de passe).
- Authentification (login via email/mot de passe).
- Gestion des notes (création, modification, suppression, récupération).
- Chaque note comprend un titre, un contenu, une date de création, et une date de modification.

A noté: Afin de gagner du temps, je ne me suis pas concentré sur la sécurité, pour allez plus loin, il faudrait utiliser le token à la place de l'id utilisateur et ajouter des verifiactions à chaques requêtes.

### Fonctionnalités Supplémentaires (Bonus)

- **Contenu Multimédia** : Implémentation de la possibilité d'ajouter du contenu multimédia dans les notes.
- **Partage de Notes** : Permet aux utilisateurs de partager des notes entre eux.
- **Application Web** : Développée en Vue.js pour visualiser et gérer les notes.

## Installation du Projet

Pour lancer le projet, les étapes suivantes doivent être suivies :

1. **Prérequis** : Avoir Docker installé sur votre machine.
2. **Clonage du Répertoire** : Cloner le dépôt Git.
3. **Démarrage avec Docker** : Utiliser `docker-compose up` pour démarrer le serveur backend, le front et la base de données.
4. **accéder au front**: http://localhost:3010

## Test

La base de donée comprend déja:

2 utilisateurs:
1. username: Juliette, password: test
2. username: Emilie, password: test

1 note partagé entre ces deux utilisateurs
2 note avec un multimédia (photo)

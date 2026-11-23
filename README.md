# Les Deux Petites Gourmandes — Mini-projet Angular

Projet pédagogique de boutique de pâtisseries (cookies, brownies et crêpes).

## Installation

Prérequis : Node.js et npm, puis ouvrir ce dossier dans VS Code.

```bash
npm install
npm start
```

Ouvrir ensuite `http://localhost:4200`.

## Espace administrateur

- URL : `http://localhost:4200/admin`
- Email : `admin@douceurs.tn`
- Mot de passe : `gourmandes2026`

## Fonctionnalités

- Accueil et boutique avec recherche et filtres par catégorie.
- Affichage du prix, des ingrédients/allergènes (structure de données), du stock et des avis (structure de données).
- Panier avec modification des quantités et total automatique.
- Personnalisation : base, couleur, garniture, message et calcul du prix.
- Création d'une box gourmande.
- Administration : connexion de démonstration, statistiques, ajout/modification/suppression de produits, gestion des quantités et liste des commandes.
- Angular standalone, Router, FormsModule, Signals, service partagé et interfaces TypeScript.
- LocalStorage pour les produits, panier et commandes ; sessionStorage pour la connexion de démonstration.

## Important pour la soutenance

Ce projet est une version front-end pédagogique : il ne possède pas de serveur, de paiement en ligne ni de vraie authentification sécurisée. Les données sont enregistrées dans le navigateur. Le mot de passe administrateur est volontairement une valeur de démonstration et ne doit pas être utilisé en production.

Les photos sont chargées depuis Unsplash : une connexion Internet est nécessaire pour les afficher. Les quantités d'ingrédients sont représentées dans les données initiales ; une gestion indépendante et complète du stock des ingrédients peut être ajoutée dans une évolution du projet.

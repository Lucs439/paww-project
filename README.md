# 🐾 PAWW - L'amour, ça se suit de près !

Application mobile complète pour le suivi et la gestion des animaux domestiques.

## 📱 Structure du projet

```
paww-project/
├── 📱 mobile-app/          # Application React Native/Expo
├── 🔧 backend/             # API Node.js
├── 🗄️ database/           # Scripts de base de données
├── 🐳 docker-compose.yml   # Configuration Docker
└── 🌐 index.html          # Page d'accueil web
```

## 🚀 Démarrage rapide

### Avec Docker (Recommandé)
```bash
# Lancer tous les services
npm run docker:up

# Voir les logs
npm run docker:logs

# Arrêter les services
npm run docker:down
```

### Développement local
```bash
# Installer toutes les dépendances
npm run install:all

# Lancer le backend et l'app mobile
npm run dev
```

## 🛠️ Services disponibles

- **Frontend Web** : http://localhost:3000
- **API Backend** : http://localhost:3001
- **Base de données** : PostgreSQL sur le port 5432
- **Métriques** : InfluxDB sur le port 8086
- **Cache** : Redis sur le port 6379

## 📱 Application mobile

L'application mobile est développée avec React Native et Expo. Elle permet :
- 📍 Suivi de la localisation des animaux
- 📊 Monitoring de la santé
- 📸 Partage de photos
- 🔔 Notifications push
- 👥 Gestion de profils multiples

## 🔧 Backend API

API REST développée avec Node.js qui gère :
- 🔐 Authentification JWT
- 📍 Données de géolocalisation
- 📊 Métriques de santé
- 🖼️ Upload de fichiers
- 🔔 Notifications push

## 🗄️ Base de données

- **PostgreSQL** : Données principales (utilisateurs, animaux, profils)
- **InfluxDB** : Métriques temporelles (localisation, santé)
- **Redis** : Cache et sessions

## 🧪 Tests

```bash
# Lancer tous les tests
npm run test

# Tests backend uniquement
npm run backend:test

# Tests mobile uniquement
npm run mobile:test
```

## 📦 Build et déploiement

```bash
# Build de l'app mobile
cd mobile-app && npx eas build

# Build du backend
cd backend && npm run build
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Développé avec ❤️ par l'équipe PAWW

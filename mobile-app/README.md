# PAWW Mobile App

Application mobile PAWW avec gestion multi-environnements.

## 🚀 Environnements

### Development
- **Usage** : Développement local
- **API** : `http://localhost:3001/api`
- **Bundle ID** : `com.paww.app.dev`
- **Nom de l'app** : PAWW Dev

### Snapshot (Staging)
- **Usage** : Tests internes et validation
- **API** : `https://api-staging.paww.app/api`
- **Bundle ID** : `com.paww.app.snapshot`
- **Nom de l'app** : PAWW Snapshot

### Production
- **Usage** : Version publique dans les stores
- **API** : `https://api.paww.app/api`
- **Bundle ID** : `com.paww.app`
- **Nom de l'app** : PAWW

## 📱 Commandes de Build

### Développement
```bash
# Build pour développement (toutes plateformes)
npm run build:dev

# Build iOS uniquement
npm run build:dev:ios

# Build Android uniquement
npm run build:dev:android
```

### Snapshot (Staging)
```bash
# Build snapshot (toutes plateformes)
npm run build:snapshot

# Build iOS uniquement
npm run build:snapshot:ios

# Build Android uniquement
npm run build:snapshot:android
```

### Production
```bash
# Build production (toutes plateformes)
npm run build:prod

# Build iOS uniquement
npm run build:prod:ios

# Build Android uniquement
npm run build:prod:android
```

## 🚢 Déploiement

### Script automatisé
```bash
# Déploiement snapshot
./scripts/deploy.sh snapshot

# Déploiement production
./scripts/deploy.sh production
```

### Soumission aux stores
```bash
# App Store
npm run submit:ios

# Google Play Store
npm run submit:android
```

## 🔄 Over-the-Air Updates

```bash
# Mise à jour snapshot
npm run update:snapshot

# Mise à jour production
npm run update:prod
```

## ⚙️ Configuration

### Variables d'environnement
Les variables sont configurées dans `src/config/env.js` et sont automatiquement sélectionnées selon l'environnement de build.

### Fichiers de configuration
- `eas.json` : Configuration des profils de build EAS
- `app.config.js` : Configuration dynamique de l'app selon l'environnement
- `src/config/env.js` : Variables d'environnement
- `src/services/api.js` : Client API configuré automatiquement

## 🔧 Installation et Setup

1. Installer EAS CLI :
```bash
npm install -g eas-cli
```

2. Se connecter à Expo :
```bash
eas login
```

3. Initialiser le projet (si pas déjà fait) :
```bash
eas init
```

4. Installer les dépendances :
```bash
npm install
```

## 🎯 Usage de l'API

```javascript
import api from '../services/api';

// L'API client est automatiquement configuré selon l'environnement
const response = await api.get('/users');
```

## 📦 Structure du projet

```
mobile-app/
├── src/
│   ├── config/
│   │   └── env.js           # Configuration environnements
│   └── services/
│       └── api.js           # Client API
├── scripts/
│   └── deploy.sh            # Script de déploiement
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD GitHub Actions
├── app.config.js            # Configuration Expo dynamique
├── eas.json                 # Configuration EAS Build
└── package.json             # Scripts de build
```

## 🔐 Sécurité

- Les tokens d'authentification sont gérés automatiquement via AsyncStorage
- Chaque environnement a son propre bundle identifier
- Les intercepteurs axios gèrent les erreurs d'authentification automatiquement 
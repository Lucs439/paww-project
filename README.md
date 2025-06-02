# 🐾 PAWW - Pet Animal Wearable Watch

PAWW est une application innovante de suivi d'animaux de compagnie utilisant des dispositifs connectés pour surveiller leur santé et leur bien-être.

## 🚀 Fonctionnalités

- 👤 Authentification complète (inscription, connexion, vérification email)
- 🔒 Sécurité renforcée (JWT, hachage des mots de passe)
- 📱 API RESTful
- 🗃️ Base de données PostgreSQL avec Sequelize
- 🐳 Conteneurisation avec Docker

## 🛠️ Technologies

- Backend: Node.js, Express
- Base de données: PostgreSQL
- ORM: Sequelize
- Authentification: JWT
- Validation: express-validator
- Conteneurisation: Docker, docker-compose

## 📦 Installation

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/paww-project.git
cd paww-project
```

2. Installer les dépendances :
```bash
# Backend
cd backend
npm install

# Frontend (à venir)
cd ../frontend
npm install
```

3. Configuration :
```bash
# Copier le fichier d'exemple de configuration
cp .env.example .env

# Éditer le fichier .env avec vos configurations
nano .env
```

4. Démarrer avec Docker :
```bash
docker-compose up -d
```

## 🔧 Configuration

Variables d'environnement requises :

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=paww_db
DB_USER=paww_user
DB_PASSWORD=paww_password

# JWT
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRES_IN=24h

# Email (à configurer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=your_password
```

## 📚 Documentation API

### Authentification

#### 🔑 Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### 🔓 Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### ✉️ Vérification Email
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

## 🧪 Tests

```bash
# Exécuter les tests
cd backend
npm test
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## ✨ Auteurs

- Lucas Compiano - Développeur Principal

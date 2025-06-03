#!/bin/bash

echo "🚀 Déploiement PAWW"

# Fonction pour construire et déployer
deploy() {
    local env=$1
    local platform=$2
    
    echo "📱 Construction $env pour $platform..."
    
    if [ "$env" = "snapshot" ]; then
        APP_ENV=snapshot eas build --profile snapshot --platform $platform --non-interactive
    elif [ "$env" = "production" ]; then
        APP_ENV=production eas build --profile production --platform $platform --non-interactive
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Build $env réussie pour $platform"
        
        # Envoyer notification (optionnel)
        # curl -X POST https://hooks.slack.com/... -d "{'text':'Build PAWW $env/$platform réussie'}"
    else
        echo "❌ Échec du build $env pour $platform"
        exit 1
    fi
}

# Vérifier les arguments
if [ "$1" = "snapshot" ]; then
    echo "🧪 Déploiement environnement SNAPSHOT"
    deploy "snapshot" "ios"
    deploy "snapshot" "android"
elif [ "$1" = "production" ]; then
    echo "🏭 Déploiement environnement PRODUCTION"
    deploy "production" "ios"
    deploy "production" "android"
else
    echo "Usage: ./deploy.sh [snapshot|production]"
    exit 1
fi

echo "🎉 Déploiement terminé !" 
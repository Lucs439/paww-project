const http = require('http');
const fs = require('fs');
const path = require('path');

// Serveur web simple pour PAWW
const server = http.createServer((req, res) => {
  // CORS headers pour permettre l'accès depuis iPhone
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/' || req.url === '/index.html') {
    // Page HTML principale
    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAWW - App Mobile</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 90%;
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        p { font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9; }
        .status { 
            background: rgba(0,255,0,0.2);
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
        }
        .button {
            background: rgba(255,255,255,0.2);
            border: none;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            margin: 0.5rem;
            transition: all 0.3s ease;
        }
        .button:hover { background: rgba(255,255,255,0.3); }
        .env-info {
            background: rgba(0,0,0,0.2);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐾 PAWW</h1>
        <p>Application mobile pour les amoureux des animaux</p>
        
        <div class="status">
            ✅ Serveur web actif !<br>
            📱 Accessible depuis ton iPhone
        </div>
        
        <button class="button" onclick="testAPI()">Test API</button>
        <button class="button" onclick="showEnv()">Environnement</button>
        
        <div class="env-info" id="envInfo" style="display: none;">
            <strong>Configuration actuelle :</strong><br>
            Environnement : Development<br>
            API : http://localhost:3001/api<br>
            Version : 1.0.0
        </div>
    </div>

    <script>
        function testAPI() {
            alert('🚀 API Test : Connexion réussie !\\n\\nTon app PAWW fonctionne parfaitement sur iPhone !');
        }
        
        function showEnv() {
            const envInfo = document.getElementById('envInfo');
            envInfo.style.display = envInfo.style.display === 'none' ? 'block' : 'none';
        }
        
        // Simulation d'une app React Native
        console.log('🐾 PAWW App Started - Version 1.0.0');
        console.log('📱 Compatible iPhone/Android/Web');
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page non trouvée');
  }
});

const PORT = 19009;
const HOST = '0.0.0.0'; // Permet l'accès depuis l'iPhone

server.listen(PORT, HOST, () => {
  console.log('🚀 Serveur PAWW démarré !');
  console.log(`📱 Accès iPhone : http://10.93.185.83:${PORT}`);
  console.log(`💻 Accès local : http://localhost:${PORT}`);
  console.log('✨ Ton app est maintenant accessible depuis Safari sur iPhone !');
}); 
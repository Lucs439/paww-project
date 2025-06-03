export default ({ config }) => {
  const isProduction = process.env.APP_ENV === 'production';
  const isSnapshot = process.env.APP_ENV === 'snapshot';
  
  return {
    ...config,
    name: isProduction ? "PAWW" : isSnapshot ? "PAWW Snapshot" : "PAWW Dev",
    slug: "paww-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: isProduction 
        ? "com.paww.app" 
        : isSnapshot 
        ? "com.paww.app.snapshot" 
        : "com.paww.app.dev"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      edgeToEdgeEnabled: true,
      package: isProduction 
        ? "com.paww.app" 
        : isSnapshot 
        ? "com.paww.app.snapshot" 
        : "com.paww.app.dev"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:3001/api",
      appEnv: process.env.APP_ENV || "development",
      eas: {
        projectId: "6147863a-3a37-457b-8a20-105988666334"
      }
    }
  };
}; 
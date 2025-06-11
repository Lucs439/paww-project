export default {
  name: "PAWW",
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
    bundleIdentifier: "com.paww.app"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    edgeToEdgeEnabled: true,
    package: "com.paww.app"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    apiUrl: "http://localhost:3001/api",
    eas: {
      projectId: "6147863a-3a37-457b-8a20-105988666334"
    }
  }
}; 
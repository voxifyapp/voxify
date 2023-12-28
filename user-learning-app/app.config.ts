module.exports = {
  name: "user-learning-app",
  slug: "user-learning-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.voxifyapp.userlearningapp",
    googleServicesFile: "./config/development/GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.voxifyapp.userlearningapp",
    googleServicesFile: "./config/development/google-services.json",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "@react-native-google-signin/google-signin",
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "@react-native-voice/voice",
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
};

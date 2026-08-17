import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.19f2bf1b08664a7ea1f69c482284acd3",
  appName: "Rate My Life",
  webDir: "dist",
  server: {
    // Loads the live Lovable app inside the native shell (great for testing).
    // Remove this block to ship a fully bundled offline build from `webDir`.
    url: "https://19f2bf1b-0866-4a7e-a1f6-9c482284acd3.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#14131a",
      showSpinner: false,
    },
  },
};

export default config;

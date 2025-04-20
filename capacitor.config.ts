
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8eea61f9ebc44d5eb096a9a7a53b3b27',
  appName: 'dex-mobile-nexus',
  webDir: 'dist',
  server: {
    url: 'https://8eea61f9-ebc4-4d5e-b096-a9a7a53b3b27.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
    }
  }
};

export default config;

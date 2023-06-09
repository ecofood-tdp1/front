import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fiuba.ecofood.app',
  appName: 'Ecofood',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.0.80:3000',
    cleartext: true
  }
};

export default config;

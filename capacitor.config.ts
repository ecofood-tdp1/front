import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fiuba.ecofood.app',
  appName: 'Ecofood',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    url: 'http://127.0.0.1:3000',
    cleartext: true
  }
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fiuba.ecofood.app',
  appName: 'Ecofood',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    url: 'http://10.0.2.2:3000',
    cleartext: true
  }
};

export default config;

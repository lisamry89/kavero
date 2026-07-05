import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kavero.app',
  appName: 'Kavero',
  webDir: 'out',
  backgroundColor: '#000000',
  plugins: {
    SplashScreen: {
      backgroundColor: '#000000',
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;

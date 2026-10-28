import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.leboxis.aura',
  appName: 'Aura',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    scrollEnabled: false,
    backgroundColor: '#050508',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#00000000',
    },
  },
}

export default config

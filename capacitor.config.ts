import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.leboxis.aura',
  appName: 'Aura',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    // Doit rester true : false désactive UIScrollView.isScrollEnabled et fige la page.
    scrollEnabled: true,
    backgroundColor: '#07080a',
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

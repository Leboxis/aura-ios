import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

export async function haptic(enabled: boolean, style: 'light' | 'medium' = 'light') {
  if (!enabled) return

  try {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light })
      return
    }
    navigator.vibrate?.(style === 'medium' ? 14 : 7)
  } catch {
    // Haptics are best-effort: unsupported devices and browser policies are ignored.
  }
}

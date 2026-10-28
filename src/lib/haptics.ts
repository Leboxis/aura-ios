import { Capacitor } from '@capacitor/core'

type ImpactStyle = 'light' | 'medium' | 'heavy'

let enabled = true

export function setHapticsEnabled(value: boolean) {
  enabled = value
}

async function nativeHaptics() {
  if (!enabled || !Capacitor.isNativePlatform()) return null
  try {
    return await import('@capacitor/haptics')
  } catch {
    return null
  }
}

/** A short, physical confirmation that a control was touched. */
export async function hapticTap(style: ImpactStyle = 'light') {
  const mod = await nativeHaptics()
  if (!mod) return
  const styles = {
    light: mod.ImpactStyle.Light,
    medium: mod.ImpactStyle.Medium,
    heavy: mod.ImpactStyle.Heavy,
  }
  await mod.Haptics.impact({ style: styles[style] }).catch(() => undefined)
}

/** Reserved for meaningful moments: session start, completion. */
export async function hapticNotice(type: 'success' | 'warning') {
  const mod = await nativeHaptics()
  if (!mod) return
  const map = {
    success: mod.NotificationType.Success,
    warning: mod.NotificationType.Warning,
  }
  await mod.Haptics.notification({ type: map[type] }).catch(() => undefined)
}

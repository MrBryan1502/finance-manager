import { BiometricAuth, BiometryType } from '@aparajita/capacitor-biometric-auth'

const CLAVE_BIOMETRIA = 'biometrics_enabled'

export type TipoBiometria = 'fingerprint' | 'face' | 'none'

export class ServicioBiometria {
  async verificarDisponibilidad(): Promise<{ disponible: boolean; tipo: TipoBiometria }> {
    try {
      const result = await BiometricAuth.checkBiometry()
      if (!result.isAvailable) {
        return { disponible: false, tipo: 'none' }
      }

      let tipo: TipoBiometria = 'fingerprint'
      if (
        result.biometryType === BiometryType.faceId ||
        result.biometryType === BiometryType.faceAuthentication
      ) {
        tipo = 'face'
      }

      return { disponible: true, tipo }
    } catch {
      return { disponible: false, tipo: 'none' }
    }
  }

  async autenticar(): Promise<boolean> {
    try {
      await BiometricAuth.authenticate({
        reason: 'Inicia sesión en Finance Manager',
        cancelTitle: 'Cancelar',
        allowDeviceCredential: true,
      })
      return true
    } catch {
      return false
    }
  }

  estaHabilitado(): boolean {
    return localStorage.getItem(CLAVE_BIOMETRIA) === 'true'
  }

  habilitar(): void {
    localStorage.setItem(CLAVE_BIOMETRIA, 'true')
  }

  deshabilitar(): void {
    localStorage.removeItem(CLAVE_BIOMETRIA)
  }
}
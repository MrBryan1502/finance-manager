import { createContext, useState, useCallback, useMemo, ReactNode } from 'react'
import { RepositorioAutenticacion } from '../../infraestructura/persistencia/repositorio-autenticacion'
import { VerificarPin } from '../../aplicacion/casos-de-uso/verificar-pin'
import { EstablecerPin } from '../../aplicacion/casos-de-uso/establecer-pin'
import { ObtenerEstadoAutenticacion } from '../../aplicacion/casos-de-uso/obtener-estado-autenticacion'
import { AutenticacionError } from '../../dominio/errores/autenticacion-error'

export interface ProveedorAutenticacionProps {
  children: ReactNode
}

export interface ContextoAutenticacion {
  sesionIniciada: boolean
  pinConfigurado: boolean
  iniciarSesion: (pin: string) => void
  iniciarSesionConBiometria: () => void
  configurarPin: (pin: string) => void
  cerrarSesion: () => void
  error: string | null
  limpiarError: () => void
}

const repositorio = new RepositorioAutenticacion()
const verificarPin = new VerificarPin(repositorio)
const establecerPin = new EstablecerPin(repositorio)
const obtenerEstado = new ObtenerEstadoAutenticacion(repositorio)

const estadoInicial = obtenerEstado.ejecutar()

export const ContextoAutenticacion = createContext<ContextoAutenticacion>({
  sesionIniciada: false,
  pinConfigurado: estadoInicial.pinConfigurado,
  iniciarSesion: () => {},
  iniciarSesionConBiometria: () => {},
  configurarPin: () => {},
  cerrarSesion: () => {},
  error: null,
  limpiarError: () => {},
})

export function ProveedorAutenticacion({
  children,
}: ProveedorAutenticacionProps) {
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [pinConfigurado, setPinConfigurado] = useState(
    estadoInicial.pinConfigurado
  )
  const [error, setError] = useState<string | null>(null)

  const iniciarSesion = useCallback((pin: string) => {
    try {
      verificarPin.ejecutar({ pin })
      setSesionIniciada(true)
      setError(null)
    } catch (e) {
      if (e instanceof AutenticacionError) {
        setError(e.message)
      } else {
        setError('Error al iniciar sesión')
      }
    }
  }, [])

  const configurarPin = useCallback((pin: string) => {
    try {
      establecerPin.ejecutar({ pin })
      setPinConfigurado(true)
      setSesionIniciada(true)
      setError(null)
    } catch (e) {
      if (e instanceof AutenticacionError) {
        setError(e.message)
      } else {
        setError('Error al configurar el PIN')
      }
    }
  }, [])

  const iniciarSesionConBiometria = useCallback(() => {
    setSesionIniciada(true)
    setError(null)
  }, [])

  const cerrarSesion = useCallback(() => {
    setSesionIniciada(false)
    setError(null)
  }, [])

  const limpiarError = useCallback(() => {
    setError(null)
  }, [])

  const valor = useMemo(
    () => ({
      sesionIniciada,
      pinConfigurado,
      iniciarSesion,
      iniciarSesionConBiometria,
      configurarPin,
      cerrarSesion,
      error,
      limpiarError,
    }),
    [sesionIniciada, pinConfigurado, iniciarSesion, iniciarSesionConBiometria, configurarPin, cerrarSesion, error, limpiarError]
  )

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  )
}

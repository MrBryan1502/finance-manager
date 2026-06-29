import { useState, useEffect } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { useAutenticacion } from '../hooks/use-autenticacion'
import { ServicioBiometria, TipoBiometria } from '../../infraestructura/servicios/servicio-biometria'
import { Wallet, Fingerprint, ScanFace } from 'lucide-react'

const servicioBiometria = new ServicioBiometria()

export function IniciarSesion() {
  const [pin, setPin] = useState('')
  const { iniciarSesion, iniciarSesionConBiometria, error, limpiarError } = useAutenticacion()
  const [biometriaDisponible, setBiometriaDisponible] = useState(false)
  const [tipoBiometria, setTipoBiometria] = useState<TipoBiometria>('none')
  const [biometriaHabilitada, setBiometriaHabilitada] = useState(false)
  const [autenticandoBiometria, setAutenticandoBiometria] = useState(false)

  useEffect(() => {
    servicioBiometria.verificarDisponibilidad().then((result) => {
      setBiometriaDisponible(result.disponible)
      setTipoBiometria(result.tipo)
      setBiometriaHabilitada(servicioBiometria.estaHabilitado())
    })
  }, [])

  useEffect(() => {
    if (biometriaHabilitada && biometriaDisponible) {
      intentarAutenticacionBiometrica()
    }
  }, [biometriaHabilitada, biometriaDisponible])

  async function intentarAutenticacionBiometrica() {
    setAutenticandoBiometria(true)
    const exito = await servicioBiometria.autenticar()
    if (exito) {
      iniciarSesionConBiometria()
      setAutenticandoBiometria(false)
    } else {
      setAutenticandoBiometria(false)
    }
  }

  function manejarCambioPin(valor: string) {
    const digitos = valor.replace(/\D/g, '').slice(0, 6)
    setPin(digitos)
    if (error) limpiarError()
  }

  function manejarEnvio() {
    iniciarSesion(pin)
    if (biometriaDisponible && !biometriaHabilitada) {
      servicioBiometria.habilitar()
      setBiometriaHabilitada(true)
    }
  }

  function toggleBiometria() {
    if (biometriaHabilitada) {
      servicioBiometria.deshabilitar()
      setBiometriaHabilitada(false)
    } else {
      servicioBiometria.habilitar()
      setBiometriaHabilitada(true)
    }
  }

  const etiquetaBiometria = tipoBiometria === 'face' ? 'Face ID / Rostro' : 'Huella digital'

  return (
    <IonPage>
      <IonContent>
        <Box
          sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            background: (theme) =>
              `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}08 50%, ${theme.palette.background.default} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -96,
              right: -96,
              width: 384,
              height: 384,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              opacity: 0.08,
              filter: 'blur(64px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -128,
              left: -128,
              width: 320,
              height: 320,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              opacity: 0.05,
              filter: 'blur(64px)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mb: 5 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                bgcolor: 'primary.main',
                boxShadow: (theme) => `0 4px 14px 0 ${theme.palette.primary.main}33`,
              }}
            >
              <Wallet size={32} />
            </Avatar>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                Finance Manager
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Tu control financiero personal
              </Typography>
            </Box>
          </Box>

          <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 24 }}>
            <CardHeader
              title="Bienvenido de nuevo"
              subheader="Ingresa tu PIN para acceder a tu información financiera"
              sx={{ textAlign: 'center' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="PIN de acceso"
                type="password"
                inputMode="numeric"
                slotProps={{
                  htmlInput: {
                    maxLength: 6,
                    sx: { textAlign: 'center', fontSize: '1.125rem', letterSpacing: '0.5em' },
                  },
                }}
                placeholder="••••••"
                value={pin}
                onChange={(e) => manejarCambioPin(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && pin.length >= 4) {
                    manejarEnvio()
                  }
                }}
                fullWidth
              />

              {error && (
                <Alert severity="error" variant="outlined">
                  {error}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                disabled={pin.length < 4}
                onClick={manejarEnvio}
                fullWidth
              >
                Ingresar
              </Button>

              {biometriaDisponible && (
                <>
                  <Divider sx={{ my: 0.5 }}>
                    <Typography variant="caption" color="text.disabled">
                      o
                    </Typography>
                  </Divider>

                  <Button
                    variant="outlined"
                    size="large"
                    disabled={autenticandoBiometria}
                    onClick={intentarAutenticacionBiometrica}
                    fullWidth
                    sx={{ gap: 1 }}
                  >
                    {tipoBiometria === 'face' ? <ScanFace size={20} /> : <Fingerprint size={20} />}
                    {autenticandoBiometria ? 'Autenticando...' : `Ingresar con ${etiquetaBiometria}`}
                  </Button>

                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={biometriaHabilitada}
                        onChange={toggleBiometria}
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Inicio automático con {etiquetaBiometria}
                      </Typography>
                    }
                    sx={{ mx: 0, justifyContent: 'center' }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  )
}
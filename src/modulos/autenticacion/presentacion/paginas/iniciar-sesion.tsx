import { useState } from 'react'
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
import { useAutenticacion } from '../hooks/use-autenticacion'
import { Wallet } from 'lucide-react'

export function IniciarSesion() {
  const [pin, setPin] = useState('')
  const { iniciarSesion, error, limpiarError } = useAutenticacion()

  function manejarCambioPin(valor: string) {
    const digitos = valor.replace(/\D/g, '').slice(0, 6)
    setPin(digitos)
    if (error) limpiarError()
  }

  function manejarEnvio() {
    iniciarSesion(pin)
  }

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
                boxShadow: (theme) =>
                  `0 4px 14px 0 ${theme.palette.primary.main}33`,
              }}
            >
              <Wallet size={32} />
            </Avatar>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              >
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
            </CardContent>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  )
}

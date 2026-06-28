import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CrearCuenta } from '../../aplicacion/casos-de-uso/crear-cuenta'
import { RepositorioCuentas } from '../../infraestructura/persistencia/repositorio-cuentas'
import { ArrowLeft, Wallet, CreditCard, Landmark } from 'lucide-react'

const repositorio = new RepositorioCuentas()
const crearCuenta = new CrearCuenta(repositorio)

export function CrearCuentaPage() {
  const [nombre, setNombre] = useState('')
  const [saldo, setSaldo] = useState('')
  const [tipo, setTipo] = useState('efectivo')
  const [exito, setExito] = useState(false)
  const history = useHistory()

  function manejarEnvio() {
    crearCuenta.ejecutar({
      nombre,
      saldo: parseFloat(saldo) || 0,
      tipo,
    })
    setExito(true)
    setTimeout(() => history.goBack(), 1500)
  }

  if (exito) {
    return (
      <IonPage>
        <IonContent>
          <Box
            sx={{
              display: 'flex',
              minHeight: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
            }}
          >
            <Alert severity="success" variant="outlined" sx={{ width: '100%', maxWidth: 400 }}>
              Cuenta creada correctamente
            </Alert>
          </Box>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonContent>
        <Box sx={{ px: 2, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Button
              variant="text"
              sx={{ minWidth: 40, width: 40, height: 40 }}
              onClick={() => history.goBack()}
            >
              <ArrowLeft size={20} />
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Nueva cuenta
            </Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Tipo de cuenta"
              subheader="Selecciona el tipo de cuenta que deseas registrar"
              slotProps={{
                title: { variant: 'subtitle2' as const },
                subheader: { variant: 'caption' as const },
              }}
            />
            <CardContent>
              <Tabs
                value={tipo}
                onChange={(_, v) => setTipo(v)}
                variant="fullWidth"
                sx={{ '& .MuiTab-root': { minHeight: 48, gap: 1 } }}
              >
                <Tab value="efectivo" label="Efectivo" icon={<Wallet size={18} />} />
                <Tab value="debito" label="Débito" icon={<CreditCard size={18} />} />
                <Tab value="ahorro" label="Ahorro" icon={<Landmark size={18} />} />
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Detalles"
              slotProps={{ title: { variant: 'subtitle2' as const } }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Nombre de la cuenta"
                placeholder="Ej: Cuenta de nómina"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
              />

              <Divider />

              <TextField
                label="Saldo inicial"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
                slotProps={{
                  htmlInput: {
                    sx: { textAlign: 'center', fontSize: '1.125rem', fontWeight: 600 },
                  },
                }}
                fullWidth
              />

              <Button
                variant="contained"
                size="large"
                disabled={!nombre}
                onClick={manejarEnvio}
                fullWidth
              >
                Crear cuenta
              </Button>
            </CardContent>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  )
}

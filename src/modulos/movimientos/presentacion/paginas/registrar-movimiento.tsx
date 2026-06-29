import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IonContent, IonPage } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'
import { RegistrarMovimiento } from '../../aplicacion/casos-de-uso/registrar-movimiento'
import { ActualizarMovimiento } from '../../aplicacion/casos-de-uso/actualizar-movimiento'
import { RepositorioMovimientos } from '../../infraestructura/persistencia/repositorio-movimientos'
import { RepositorioCuentas } from '../../../cuentas/infraestructura/persistencia/repositorio-cuentas'
import { ListarCuentas } from '../../../cuentas/aplicacion/casos-de-uso/listar-cuentas'
import { Cuenta } from '../../../cuentas/dominio/entidades/cuenta'
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

const repositorioMovs = new RepositorioMovimientos()
const repositorioCuentas = new RepositorioCuentas()
const registrarMovimiento = new RegistrarMovimiento(repositorioMovs, repositorioCuentas)
const actualizarMovimiento = new ActualizarMovimiento(repositorioMovs, repositorioCuentas)
const listarCuentas = new ListarCuentas(repositorioCuentas)

const categorias = [
  'Alimentación',
  'Transporte',
  'Vivienda',
  'Salud',
  'Educación',
  'Entretenimiento',
  'Servicios',
  'Ropa',
  'Otros',
]

export function RegistrarMovimientoPage() {
  const { id } = useParams<{ id?: string }>()
  const history = useHistory()
  const esEdicion = !!id

  const [tipo, setTipo] = useState(TipoMovimiento.INGRESO)
  const [monto, setMonto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('')
  const [cuentaId, setCuentaId] = useState('')
  const [exito, setExito] = useState(false)

  const cuentas = listarCuentas.ejecutar().filter((c) => c.tipo !== 'credito')

  useEffect(() => {
    if (id) {
      const mov = repositorioMovs.obtenerPorId(id)
      if (mov) {
        setTipo(mov.tipo)
        setMonto(String(mov.monto))
        setDescripcion(mov.descripcion)
        setCategoria(mov.categoria)
        setCuentaId(mov.cuentaId)
      }
    }
  }, [id])

  function manejarEnvio() {
    if (esEdicion && id) {
      actualizarMovimiento.ejecutar({
        id,
        tipo,
        monto: parseFloat(monto),
        descripcion,
        categoria,
        cuentaId: cuentaId || cuentas[0]?.id || 'default',
      })
    } else {
      registrarMovimiento.ejecutar({
        tipo,
        monto: parseFloat(monto),
        descripcion,
        categoria,
        cuentaId: cuentaId || cuentas[0]?.id || 'default',
      })
    }
    setExito(true)
    setTimeout(() => history.goBack(), 1500)
  }

  if (exito) {
    return (
      <IonPage>
        <IonContent>
          <Box sx={{ display: 'flex', minHeight: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 3 }}>
            <Alert severity="success" variant="outlined" sx={{ width: '100%', maxWidth: 400 }}>
              Movimiento {esEdicion ? 'actualizado' : 'registrado'} correctamente
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
            <Button variant="text" sx={{ minWidth: 40, width: 40, height: 40 }} onClick={() => history.goBack()}>
              <ArrowLeft size={20} />
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {esEdicion ? 'Editar movimiento' : 'Nuevo movimiento'}
            </Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Tipo de movimiento"
              subheader="Selecciona si es un ingreso o un gasto"
              slotProps={{ title: { variant: 'subtitle2' as const }, subheader: { variant: 'caption' as const } }}
            />
            <CardContent>
              <Tabs value={tipo} onChange={(_, v) => setTipo(v)} variant="fullWidth" sx={{ '& .MuiTab-root': { minHeight: 48, gap: 1 } }}>
                <Tab value={TipoMovimiento.INGRESO} label="Ingreso" icon={<ArrowDownLeft size={18} />}
                  sx={{ color: '#10b981', '&.Mui-selected': { color: '#10b981', fontWeight: 600 } }} />
                <Tab value={TipoMovimiento.GASTO} label="Gasto" icon={<ArrowUpRight size={18} />}
                  sx={{ color: '#f43f5e', '&.Mui-selected': { color: '#f43f5e', fontWeight: 600 } }} />
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Detalles" slotProps={{ title: { variant: 'subtitle2' as const } }} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Monto" type="number" inputMode="decimal" placeholder="0.00" value={monto}
                onChange={(e) => setMonto(e.target.value)}
                slotProps={{ htmlInput: { sx: { textAlign: 'center', fontSize: '1.125rem', fontWeight: 600 } } }} fullWidth />

              <TextField label="Descripción" placeholder="¿En qué gastaste?" value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)} fullWidth />

              <FormControl fullWidth>
                <InputLabel id="categoria-label">Categoría</InputLabel>
                <Select labelId="categoria-label" label="Categoría" value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}>
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="cuenta-label">Cuenta</InputLabel>
                <Select labelId="cuenta-label" label="Cuenta" value={cuentaId}
                  onChange={(e) => setCuentaId(e.target.value)}>
                  {cuentas.length === 0 && (
                    <MenuItem disabled value="">No hay cuentas disponibles</MenuItem>
                  )}
                  {cuentas.map((c: Cuenta) => (
                    <MenuItem key={c.id} value={c.id}>{c.nombre} — ${c.saldo.toFixed(2)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Chip label={esEdicion ? 'Esta acción actualizará el movimiento' : tipo === TipoMovimiento.INGRESO ? 'Esta acción registrará un ingreso' : 'Esta acción registrará un gasto'}
                variant="outlined" color={tipo === TipoMovimiento.INGRESO ? 'success' : 'error'} sx={{ width: 'fit-content' }} />

              <Button variant="contained" size="large" disabled={!monto || !descripcion || !categoria || !cuentaId}
                onClick={manejarEnvio} fullWidth>
                {esEdicion ? 'Actualizar' : 'Registrar'}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  )
}
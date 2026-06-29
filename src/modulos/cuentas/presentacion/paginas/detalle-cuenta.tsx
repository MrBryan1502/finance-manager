import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IonContent, IonPage } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { RepositorioCuentas } from '../../infraestructura/persistencia/repositorio-cuentas'
import { RepositorioComprasPlazo } from '../../infraestructura/persistencia/repositorio-compras-plazo'
import { ListarComprasPlazo } from '../../aplicacion/casos-de-uso/listar-compras-plazo'
import { CrearCompraPlazo } from '../../aplicacion/casos-de-uso/crear-compra-plazo'
import { CompraPlazo } from '../../dominio/entidades/compra-plazo'
import { ArrowLeft, Plus, Calendar } from 'lucide-react'

const repositorioCuentas = new RepositorioCuentas()
const repositorioCompras = new RepositorioComprasPlazo()
const listarCompras = new ListarComprasPlazo(repositorioCompras)
const crearCompra = new CrearCompraPlazo(repositorioCompras)

function formatear(valor: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(valor)
}

function calcularPagoMensual(cuentaId: string): number {
  const compras = listarCompras.ejecutar(cuentaId)
  return compras.reduce((sum, c) => {
    return sum + Math.round((c.montoTotal / c.mesesTotales) * 100) / 100
  }, 0)
}

export function DetalleCuentaPage() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const cuenta = repositorioCuentas.obtenerPorId(id)

  const [compras, setCompras] = useState<CompraPlazo[]>(() => listarCompras.ejecutar(id))
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  const [nuevoMonto, setNuevoMonto] = useState('')
  const [nuevosMeses, setNuevosMeses] = useState('')

  if (!cuenta) {
    return (
      <IonPage>
        <IonContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 12, px: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Cuenta no encontrada
            </Typography>
            <Button sx={{ mt: 2 }} onClick={() => history.goBack()}>
              Volver
            </Button>
          </Box>
        </IonContent>
      </IonPage>
    )
  }

  const disponible = (cuenta.limiteCredito ?? 0) - cuenta.saldo
  const pagoMensualTotal = calcularPagoMensual(id)
  const usoCredito = cuenta.limiteCredito ? (cuenta.saldo / cuenta.limiteCredito) * 100 : 0

  function manejarAgregarCompra() {
    crearCompra.ejecutar({
      cuentaId: id,
      descripcion: nuevaDescripcion,
      montoTotal: parseFloat(nuevoMonto) || 0,
      mesesTotales: parseInt(nuevosMeses) || 1,
    })
    setCompras(listarCompras.ejecutar(id))
    setDialogoAbierto(false)
    setNuevaDescripcion('')
    setNuevoMonto('')
    setNuevosMeses('')
  }

  return (
    <IonPage>
      <IonContent>
        <Box sx={{ px: 2, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Button variant="text" sx={{ minWidth: 40, width: 40, height: 40 }} onClick={() => history.goBack()}>
              <ArrowLeft size={20} />
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {cuenta.nombre}
            </Typography>
          </Box>

          <Card sx={{ mb: 3, border: '1px solid', borderColor: '#f43f5e40' }}>
            <CardContent sx={{ px: 3, py: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Deuda total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#f43f5e' }}>
                    {formatear(cuenta.saldo)}
                  </Typography>
                </Box>
                <Chip label="Crédito" size="small" color="error" variant="outlined" />
              </Box>

              <LinearProgress
                variant="determinate"
                value={usoCredito}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  mb: 2,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: usoCredito > 80 ? '#f43f5e' : usoCredito > 50 ? '#f59e0b' : '#10b981',
                    borderRadius: 3,
                  },
                }}
              />

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Límite
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatear(cuenta.limiteCredito ?? 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Disponible
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: disponible < 1000 ? '#f43f5e' : '#10b981' }}>
                    {formatear(disponible)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Pagos al mes
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatear(pagoMensualTotal)}
                  </Typography>
                </Box>
              </Box>

              {cuenta.diaCorte && cuenta.diaPago && (
                <Box sx={{ display: 'flex', gap: 2, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" color="text.disabled">
                    Corte día {cuenta.diaCorte}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Pago día {cuenta.diaPago}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Compras a plazos
            </Typography>
            <Button size="small" variant="contained" sx={{ minWidth: 36, height: 36, width: 36 }} onClick={() => setDialogoAbierto(true)}>
              <Plus size={18} />
            </Button>
          </Box>

          {compras.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <Typography variant="body2" color="text.secondary">
                No hay compras a plazos registradas
              </Typography>
              <Button variant="text" size="small" sx={{ mt: 1 }} onClick={() => setDialogoAbierto(true)}>
                Agregar primera compra
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {compras.map((c) => {
                const pagoMensual = Math.round((c.montoTotal / c.mesesTotales) * 100) / 100
                return (
                  <Card key={c.id}>
                    <CardContent sx={{ px: 2, py: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {c.descripcion}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatear(c.montoTotal)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Chip
                          icon={<Calendar size={14} />}
                          label={`${c.mesesRestantes} de ${c.mesesTotales} meses`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 24, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatear(pagoMensual)}/mes
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )
              })}
            </Box>
          )}
        </Box>

        <Dialog open={dialogoAbierto} onClose={() => setDialogoAbierto(false)} fullWidth maxWidth="sm">
          <DialogTitle>Nueva compra a plazos</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Descripción"
              placeholder="Ej: Televisor"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
              fullWidth
            />
            <TextField
              label="Monto total"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={nuevoMonto}
              onChange={(e) => setNuevoMonto(e.target.value)}
              fullWidth
            />
            <TextField
              label="Meses"
              type="number"
              inputMode="numeric"
              placeholder="12"
              value={nuevosMeses}
              onChange={(e) => setNuevosMeses(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
            <Button
              variant="contained"
              disabled={!nuevaDescripcion || !nuevoMonto || !nuevosMeses}
              onClick={manejarAgregarCompra}
            >
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </IonContent>
    </IonPage>
  )
}
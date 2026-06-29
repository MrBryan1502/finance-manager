import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { ListarMovimientos } from '../../aplicacion/casos-de-uso/listar-movimientos'
import { EliminarMovimiento } from '../../aplicacion/casos-de-uso/eliminar-movimiento'
import { RepositorioMovimientos } from '../../infraestructura/persistencia/repositorio-movimientos'
import { RepositorioCuentas } from '../../../cuentas/infraestructura/persistencia/repositorio-cuentas'
import { Movimiento } from '../../dominio/entidades/movimiento'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  RefreshCw,
  Pencil,
  Trash2,
} from 'lucide-react'

const repositorioMovs = new RepositorioMovimientos()
const repositorioCuentas = new RepositorioCuentas()
const listarMovimientos = new ListarMovimientos(repositorioMovs)
const eliminarMovimiento = new EliminarMovimiento(repositorioMovs, repositorioCuentas)

function formatear(valor: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(valor)
}

function formatearFecha(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function ListaMovimientos() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [eliminando, setEliminando] = useState<Movimiento | null>(null)
  const history = useHistory()

  function cargarDatos() {
    setMovimientos(listarMovimientos.ejecutar())
  }

  useIonViewWillEnter(() => {
    cargarDatos()
  })

  function manejarRefresh(e: CustomEvent) {
    cargarDatos()
    e.detail.complete()
  }

  function confirmarEliminar() {
    if (!eliminando) return
    eliminarMovimiento.ejecutar(eliminando.id)
    setEliminando(null)
    cargarDatos()
  }

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={manejarRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Box sx={{ px: 2, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Movimientos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Historial de transacciones
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ minWidth: 40, width: 40, height: 40, borderRadius: 2 }}
              onClick={() => history.push('/movimientos/registrar')}
            >
              <Plus size={20} />
            </Button>
          </Box>

          {movimientos.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'action.hover', color: 'text.disabled', mb: 2 }}>
                <RefreshCw size={32} />
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No hay movimientos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Registra tu primer movimiento para verlo aquí
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => history.push('/movimientos/registrar')}>
                <Plus size={16} style={{ marginRight: 8 }} />
                Registrar movimiento
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {movimientos.map((m) => (
                <Card key={m.id}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5,
                      '&:last-child': { pb: 1.5 },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flex: 1, minWidth: 0 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: m.tipo === 'INGRESO' ? '#10b98115' : '#f43f5e15',
                          color: m.tipo === 'INGRESO' ? '#10b981' : '#f43f5e',
                        }}
                      >
                        {m.tipo === 'INGRESO' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {m.descripcion}
                          </Typography>
                          <Chip
                            label={m.tipo === 'INGRESO' ? 'Ingreso' : 'Gasto'}
                            size="small"
                            color={m.tipo === 'INGRESO' ? 'success' : 'error'}
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.625rem', flexShrink: 0 }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {m.categoria} · {formatearFecha(m.fecha)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: m.tipo === 'INGRESO' ? '#10b981' : '#f43f5e', mr: 1 }}>
                        {m.tipo === 'INGRESO' ? '+' : '-'}{formatear(m.monto)}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
                        onClick={() => history.push(`/movimientos/editar/${m.id}`)}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ opacity: 0.5, '&:hover': { opacity: 1, color: '#f43f5e' } }}
                        onClick={() => setEliminando(m)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        <Dialog open={!!eliminando} onClose={() => setEliminando(null)} fullWidth maxWidth="xs">
          <DialogTitle>Eliminar movimiento</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              ¿Estás seguro de eliminar <strong>{eliminando?.descripcion}</strong>? También se revertirá el efecto en el saldo de la cuenta.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setEliminando(null)}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={confirmarEliminar}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </IonContent>
    </IonPage>
  )
}
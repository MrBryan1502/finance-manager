import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Avatar from '@mui/material/Avatar'
import { ListarCuentas } from '../../aplicacion/casos-de-uso/listar-cuentas'
import { ActualizarCuenta } from '../../aplicacion/casos-de-uso/actualizar-cuenta'
import { EliminarCuenta } from '../../aplicacion/casos-de-uso/eliminar-cuenta'
import { RepositorioCuentas } from '../../infraestructura/persistencia/repositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'
import { Building2, Wallet, CreditCard, Landmark, CreditCard as CreditoIcon, Plus, Pencil, Trash2, X } from 'lucide-react'

const repositorio = new RepositorioCuentas()
const listarCuentas = new ListarCuentas(repositorio)
const actualizarCuenta = new ActualizarCuenta(repositorio)
const eliminarCuenta = new EliminarCuenta(repositorio)

function formatear(valor: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(valor)
}

const iconos: Record<string, React.ReactNode> = {
  efectivo: <Wallet size={20} />,
  debito: <CreditCard size={20} />,
  ahorro: <Landmark size={20} />,
  credito: <CreditoIcon size={20} />,
}

const colores: Record<string, string> = {
  efectivo: '#10b981',
  debito: '#3b82f6',
  ahorro: '#8b5cf6',
  credito: '#f43f5e',
}

const etiquetas: Record<string, string> = {
  efectivo: 'Efectivo',
  debito: 'Débito',
  ahorro: 'Ahorro',
  credito: 'Crédito',
}

export function ListaCuentas() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([])
  const history = useHistory()

  const [editando, setEditando] = useState<Cuenta | null>(null)
  const [editNombre, setEditNombre] = useState('')
  const [editSaldo, setEditSaldo] = useState('')
  const [editTipo, setEditTipo] = useState('efectivo')
  const [editLimite, setEditLimite] = useState('')
  const [editCorte, setEditCorte] = useState('')
  const [editPago, setEditPago] = useState('')

  const [eliminando, setEliminando] = useState<Cuenta | null>(null)

  function cargarDatos() {
    setCuentas(listarCuentas.ejecutar())
  }

  useIonViewWillEnter(() => {
    cargarDatos()
  })

  function manejarRefresh(e: CustomEvent) {
    cargarDatos()
    e.detail.complete()
  }

  function abrirEditar(c: Cuenta) {
    setEditando(c)
    setEditNombre(c.nombre)
    setEditSaldo(String(c.saldo))
    setEditTipo(c.tipo)
    setEditLimite(c.limiteCredito !== undefined ? String(c.limiteCredito) : '')
    setEditCorte(c.diaCorte !== undefined ? String(c.diaCorte) : '')
    setEditPago(c.diaPago !== undefined ? String(c.diaPago) : '')
  }

  function guardarEdicion() {
    if (!editando) return
    actualizarCuenta.ejecutar({
      id: editando.id,
      nombre: editNombre,
      saldo: parseFloat(editSaldo) || 0,
      tipo: editTipo,
      limiteCredito: editTipo === 'credito' ? parseFloat(editLimite) || 0 : undefined,
      diaCorte: editTipo === 'credito' ? parseInt(editCorte) || undefined : undefined,
      diaPago: editTipo === 'credito' ? parseInt(editPago) || undefined : undefined,
    })
    setEditando(null)
    cargarDatos()
  }

  function confirmarEliminar() {
    if (!eliminando) return
    eliminarCuenta.ejecutar(eliminando.id)
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Cuentas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tus cuentas registradas
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ minWidth: 40, width: 40, height: 40, borderRadius: 2 }}
              onClick={() => history.push('/cuentas/crear')}
            >
              <Plus size={20} />
            </Button>
          </Box>

          {cuentas.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 12,
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'action.hover',
                  color: 'text.disabled',
                  mb: 2,
                }}
              >
                <Building2 size={32} />
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No hay cuentas
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Crea tu primera cuenta para empezar
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => history.push('/cuentas/crear')}
              >
                <Plus size={16} style={{ marginRight: 8 }} />
                Crear cuenta
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {cuentas.map((c) => (
                <Card
                  key={c.id}
                  sx={{ cursor: c.tipo === 'credito' ? 'pointer' : undefined }}
                  onClick={() => {
                    if (c.tipo === 'credito') history.push(`/cuentas/${c.id}/detalle`)
                  }}
                >
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
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: `${colores[c.tipo] || '#6b7280'}15`,
                          color: colores[c.tipo] || '#6b7280',
                        }}
                      >
                        {iconos[c.tipo] || <Wallet size={20} />}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {c.nombre}
                          </Typography>
                          <Chip
                            label={etiquetas[c.tipo] || c.tipo}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.625rem' }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {c.tipo === 'credito'
                            ? `Disponible: ${formatear((c.limiteCredito ?? 0) - c.saldo)}`
                            : 'Saldo disponible'}
                        </Typography>
                        {c.tipo === 'credito' && c.diaCorte && c.diaPago && (
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.625rem', mt: 0.25 }}>
                            Corte día {c.diaCorte} · Pago día {c.diaPago}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ textAlign: 'right', mr: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatear(c.saldo)}
                        </Typography>
                        {c.tipo === 'credito' && c.limiteCredito && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                            Límite: {formatear(c.limiteCredito)}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
                        onClick={(e) => { e.stopPropagation(); abrirEditar(c) }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ opacity: 0.5, '&:hover': { opacity: 1, color: '#f43f5e' } }}
                        onClick={(e) => { e.stopPropagation(); setEliminando(c) }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </CardContent>
                  {c.tipo === 'credito' && c.limiteCredito && (
                    <LinearProgress
                      variant="determinate"
                      value={(c.saldo / c.limiteCredito) * 100}
                      sx={{
                        height: 3,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: c.saldo / c.limiteCredito > 0.8 ? '#f43f5e' : '#10b981',
                        },
                      }}
                    />
                  )}
                </Card>
              ))}
            </Box>
          )}
        </Box>

        <Dialog open={!!editando} onClose={() => setEditando(null)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Editar cuenta
            <IconButton size="small" onClick={() => setEditando(null)}><X size={18} /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
            <Tabs value={editTipo} onChange={(_, v) => setEditTipo(v)} variant="fullWidth" sx={{ '& .MuiTab-root': { minHeight: 40, gap: 0.5, fontSize: '0.75rem' } }}>
              <Tab value="efectivo" label="Efectivo" />
              <Tab value="debito" label="Débito" />
              <Tab value="ahorro" label="Ahorro" />
              <Tab value="credito" label="Crédito" />
            </Tabs>
            <TextField label="Nombre" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} fullWidth />
            <TextField
              label={editTipo === 'credito' ? 'Deuda actual' : 'Saldo'}
              type="number" inputMode="decimal"
              value={editSaldo} onChange={(e) => setEditSaldo(e.target.value)}
              slotProps={{ htmlInput: { sx: { textAlign: 'center', fontSize: '1.125rem', fontWeight: 600 } } }}
              fullWidth
            />
            {editTipo === 'credito' && (
              <>
                <TextField label="Límite de crédito" type="number" inputMode="decimal" value={editLimite} onChange={(e) => setEditLimite(e.target.value)}
                  slotProps={{ htmlInput: { sx: { textAlign: 'center' } } }} fullWidth />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField label="Día de corte" type="number" inputMode="numeric" value={editCorte}
                    onChange={(e) => setEditCorte(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    slotProps={{ htmlInput: { min: 1, max: 31, sx: { textAlign: 'center' } } }} fullWidth />
                  <TextField label="Día de pago" type="number" inputMode="numeric" value={editPago}
                    onChange={(e) => setEditPago(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    slotProps={{ htmlInput: { min: 1, max: 31, sx: { textAlign: 'center' } } }} fullWidth />
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setEditando(null)}>Cancelar</Button>
            <Button variant="contained" disabled={!editNombre} onClick={guardarEdicion}>Guardar</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={!!eliminando} onClose={() => setEliminando(null)} fullWidth maxWidth="xs">
          <DialogTitle>Eliminar cuenta</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              ¿Estás seguro de eliminar <strong>{eliminando?.nombre}</strong>? Esta acción no se puede deshacer.
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
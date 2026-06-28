import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { ListarMovimientos } from '../../aplicacion/casos-de-uso/listar-movimientos'
import { RepositorioMovimientos } from '../../infraestructura/persistencia/repositorio-movimientos'
import { Movimiento } from '../../dominio/entidades/movimiento'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  RefreshCw,
} from 'lucide-react'

const repositorio = new RepositorioMovimientos()
const listarMovimientos = new ListarMovimientos(repositorio)

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
                <RefreshCw size={32} />
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No hay movimientos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Registra tu primer movimiento para verlo aquí
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => history.push('/movimientos/registrar')}
              >
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
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor:
                            m.tipo === 'INGRESO' ? '#10b98115' : '#f43f5e15',
                          color:
                            m.tipo === 'INGRESO' ? '#10b981' : '#f43f5e',
                        }}
                      >
                        {m.tipo === 'INGRESO' ? (
                          <ArrowDownLeft size={16} />
                        ) : (
                          <ArrowUpRight size={16} />
                        )}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {m.descripcion}
                          </Typography>
                          <Chip
                            label={m.tipo === 'INGRESO' ? 'Ingreso' : 'Gasto'}
                            size="small"
                            color={m.tipo === 'INGRESO' ? 'success' : 'error'}
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.625rem' }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {m.categoria} · {formatearFecha(m.fecha)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: m.tipo === 'INGRESO' ? '#10b981' : '#f43f5e',
                      }}
                    >
                      {m.tipo === 'INGRESO' ? '+' : '-'}
                      {formatear(m.monto)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </IonContent>
    </IonPage>
  )
}

import { IonContent, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { useHistory } from 'react-router-dom'
import { ObtenerPatrimonio } from '../../aplicacion/casos-de-uso/obtener-patrimonio'
import { RepositorioPatrimonio } from '../../infraestructura/persistencia/repositorio-patrimonio'
import { ResumenPatrimonioDTO } from '../../aplicacion/dto/resumen-patrimonio-dto'
import { ListarMovimientos } from '../../../movimientos/aplicacion/casos-de-uso/listar-movimientos'
import { RepositorioMovimientos } from '../../../movimientos/infraestructura/persistencia/repositorio-movimientos'
import { Movimiento } from '../../../movimientos/dominio/entidades/movimiento'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  RefreshCw,
} from 'lucide-react'
import { useState } from 'react'

const repositorioPatrimonio = new RepositorioPatrimonio()
const obtenerPatrimonio = new ObtenerPatrimonio(repositorioPatrimonio)
const repositorioMovimientos = new RepositorioMovimientos()
const listarMovimientos = new ListarMovimientos(repositorioMovimientos)

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

export function PanelPatrimonio() {
  const [resumen, setResumen] = useState<ResumenPatrimonioDTO>({
    activos: 0,
    pasivos: 0,
    patrimonio: 0,
    ingresos: 0,
    gastos: 0,
  })
  const [movimientosRecientes, setMovimientosRecientes] = useState<Movimiento[]>([])
  const history = useHistory()

  function cargarDatos() {
    setResumen(obtenerPatrimonio.ejecutar())
    setMovimientosRecientes(listarMovimientos.ejecutar().slice(-5).reverse())
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
              <Typography variant="body2" color="text.secondary">
                Bienvenido
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Resumen financiero
              </Typography>
            </Box>
            <Avatar
              sx={{ bgcolor: 'primary.main', opacity: 0.1, color: 'primary.main' }}
            >
              <Wallet size={20} />
            </Avatar>
          </Box>

          <Card
            sx={{
              mb: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'primary.main',
              opacity: 0.8,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 80%)`,
              boxShadow: (theme) =>
                `0 8px 32px 0 ${theme.palette.primary.main}40`,
            }}
          >
            <CardContent sx={{ px: 3, py: 4 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: 'primary.contrastText', opacity: 0.8 }}
              >
                Patrimonio neto
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'primary.contrastText',
                  mt: 0.5,
                }}
              >
                {formatear(resumen.patrimonio)}
              </Typography>
              <Divider
                sx={{ my: 2, borderColor: 'primary.contrastText', opacity: 0.15 }}
              />
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: 'primary.contrastText',
                      opacity: 0.15,
                      color: 'primary.contrastText',
                    }}
                  >
                    <TrendingUp size={14} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'primary.contrastText', opacity: 0.7 }}
                    >
                      Activos
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'primary.contrastText' }}
                    >
                      {formatear(resumen.activos)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: 'primary.contrastText',
                      opacity: 0.15,
                      color: 'primary.contrastText',
                    }}
                  >
                    <TrendingDown size={14} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'primary.contrastText', opacity: 0.7 }}
                    >
                      Pasivos
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'primary.contrastText' }}
                    >
                      {formatear(resumen.pasivos)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: '#10b98115',
                    color: '#10b981',
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                  }}
                >
                  <PiggyBank size={20} />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Ingresos
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatear(resumen.ingresos)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: '#f43f5e15',
                    color: '#f43f5e',
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                  }}
                >
                  <ArrowUpRight size={20} />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Gastos
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatear(resumen.gastos)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Acciones rápidas"
              slotProps={{ title: { variant: 'subtitle2' as const } }}
            />
            <CardContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ flexDirection: 'column', gap: 0.5, py: 1.5, fontSize: '0.75rem' }}
                  onClick={() => history.push('/movimientos/registrar')}
                >
                  <Plus size={16} />
                  Registrar ingreso
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ flexDirection: 'column', gap: 0.5, py: 1.5, fontSize: '0.75rem' }}
                  onClick={() => history.push('/movimientos/registrar')}
                >
                  <Plus size={16} />
                  Registrar gasto
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Movimientos recientes
              </Typography>
              <Button
                size="small"
                variant="text"
                sx={{ fontSize: '0.75rem' }}
                onClick={() => history.push('/movimientos')}
              >
                <RefreshCw size={12} style={{ marginRight: 4 }} />
                Ver todos
              </Button>
            </Box>
            {movimientosRecientes.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  No hay movimientos recientes
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {movimientosRecientes.map((m) => (
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
                            width: 32,
                            height: 32,
                            borderRadius: 1.5,
                            bgcolor:
                              m.tipo === 'INGRESO' ? '#10b98115' : '#f43f5e15',
                            color:
                              m.tipo === 'INGRESO' ? '#10b981' : '#f43f5e',
                          }}
                        >
                          {m.tipo === 'INGRESO' ? (
                            <ArrowDownLeft size={14} />
                          ) : (
                            <ArrowUpRight size={14} />
                          )}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {m.descripcion}
                          </Typography>
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
        </Box>
      </IonContent>
    </IonPage>
  )
}

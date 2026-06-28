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
import { ListarCuentas } from '../../aplicacion/casos-de-uso/listar-cuentas'
import { RepositorioCuentas } from '../../infraestructura/persistencia/repositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'
import { Building2, Wallet, CreditCard, Landmark, Plus } from 'lucide-react'

const repositorio = new RepositorioCuentas()
const listarCuentas = new ListarCuentas(repositorio)

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
}

const colores: Record<string, string> = {
  efectivo: '#10b981',
  debito: '#3b82f6',
  ahorro: '#8b5cf6',
}

const etiquetas: Record<string, string> = {
  efectivo: 'Efectivo',
  debito: 'Débito',
  ahorro: 'Ahorro',
}

export function ListaCuentas() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([])
  const history = useHistory()

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
                <Card key={c.id}>
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
                          Saldo disponible
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatear(c.saldo)}
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

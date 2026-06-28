import { useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
        <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background px-6">
          <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-primary/5 blur-3xl" />

          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <Wallet className="size-8 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Finance Manager
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Tu control financiero personal
              </p>
            </div>
          </div>

          <Card className="w-full max-w-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-base">
                Bienvenido de nuevo
              </CardTitle>
              <CardDescription className="text-center">
                Ingresa tu PIN para acceder a tu información financiera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN de acceso</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => manejarCambioPin(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && pin.length >= 4) {
                      manejarEnvio()
                    }
                  }}
                  className="h-10 text-center text-lg tracking-[0.5em]"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                className="h-10 w-full text-base"
                disabled={pin.length < 4}
                onClick={manejarEnvio}
              >
                Ingresar
              </Button>
            </CardContent>
          </Card>
        </div>
      </IonContent>
    </IonPage>
  )
}

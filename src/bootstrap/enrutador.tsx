import { Redirect, Route, Switch } from 'react-router-dom'
import { useAutenticacion } from '../modulos/autenticacion/presentacion/hooks/use-autenticacion'
import { IniciarSesion } from '../modulos/autenticacion/presentacion/paginas/iniciar-sesion'
import { ConfigurarPin } from '../modulos/autenticacion/presentacion/paginas/configurar-pin'
import { lazy, Suspense } from 'react'

const Tabs = lazy(() => import('./tabs'))

export function Enrutador() {
  const { sesionIniciada, pinConfigurado } = useAutenticacion()

  if (sesionIniciada) {
    return (
      <Suspense fallback={null}>
        <Tabs />
      </Suspense>
    )
  }

  return (
    <Switch>
      <Route exact path="/configurar-pin">
        <ConfigurarPin />
      </Route>
      <Route exact path="/iniciar-sesion">
        <IniciarSesion />
      </Route>
      <Route path="/">
        {pinConfigurado ? (
          <Redirect to="/iniciar-sesion" />
        ) : (
          <Redirect to="/configurar-pin" />
        )}
      </Route>
    </Switch>
  )
}

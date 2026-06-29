import { Redirect, Route } from 'react-router-dom'
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { wallet, list, card } from 'ionicons/icons'
import { PanelPatrimonio } from '../modulos/patrimonio/presentacion/paginas/panel-patrimonio'
import { ListaMovimientos } from '../modulos/movimientos/presentacion/paginas/lista-movimientos'
import { RegistrarMovimientoPage } from '../modulos/movimientos/presentacion/paginas/registrar-movimiento'
import { ListaCuentas } from '../modulos/cuentas/presentacion/paginas/lista-cuentas'
import { CrearCuentaPage } from '../modulos/cuentas/presentacion/paginas/crear-cuenta'
import { DetalleCuentaPage } from '../modulos/cuentas/presentacion/paginas/detalle-cuenta'

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/panel">
          <PanelPatrimonio />
        </Route>
        <Route exact path="/movimientos">
          <ListaMovimientos />
        </Route>
        <Route exact path="/movimientos/registrar">
          <RegistrarMovimientoPage />
        </Route>
        <Route exact path="/movimientos/editar/:id">
          <RegistrarMovimientoPage />
        </Route>
        <Route exact path="/cuentas">
          <ListaCuentas />
        </Route>
        <Route exact path="/cuentas/crear">
          <CrearCuentaPage />
        </Route>
        <Route exact path="/cuentas/:id/detalle">
          <DetalleCuentaPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/panel" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="panel" href="/panel">
          <IonIcon aria-hidden="true" icon={wallet} />
          <IonLabel>Panel</IonLabel>
        </IonTabButton>
        <IonTabButton tab="movimientos" href="/movimientos">
          <IonIcon aria-hidden="true" icon={list} />
          <IonLabel>Movimientos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cuentas" href="/cuentas">
          <IonIcon aria-hidden="true" icon={card} />
          <IonLabel>Cuentas</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

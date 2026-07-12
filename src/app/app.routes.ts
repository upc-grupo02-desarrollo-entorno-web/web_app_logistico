// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { Layout as PublicLayout } from './public/layout/layout';
import { Home } from './public/home/home';
import { CatalogoServicios } from './public/catalogo-servicios/catalogo-servicios';
import { CatalogoRutas } from './public/catalogo-rutas/catalogo-rutas';
import { SimuladorCotizacion } from './public/simulador-cotizacion/simulador-cotizacion';
import { Login } from './client/login/login';

import { Layout as ClientLayout } from './client/layout/layout';
import { Dashboard } from './client/dashboard/dashboard';
import { Despachos } from './client/despachos/despachos';
import { Seguimiento } from './client/seguimiento/seguimiento';
import { Historial } from './client/historial/historial';
import { Incidencias } from './client/incidencias/incidencias';
import { CentroAlertas } from './client/centro-alertas/centro-alertas';

import { Layout as AdminLayout } from './admin/layout/layout';
import { DashboardAdmin } from './admin/dashboard-admin/dashboard-admin';
import { GestionDespachos } from './admin/gestion-despachos/gestion-despachos';
import { GestionContenedores } from './admin/gestion-contenedores/gestion-contenedores';
import { GestionIncidencias } from './admin/gestion-incidencias/gestion-incidencias';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'catalogo-servicios', component: CatalogoServicios },
      { path: 'catalogo-rutas', component: CatalogoRutas },
      { path: 'simulador-cotizacion', component: SimuladorCotizacion },
    ]
  },
  { path: 'login', component: Login },
  {
    path: 'cliente',
    component: ClientLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'despachos', component: Despachos },
      { path: 'seguimiento', component: Seguimiento },
      { path: 'historial', component: Historial },
      { path: 'incidencias', component: Incidencias },
      { path: 'centro-alertas', component: CentroAlertas },
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardAdmin },
      { path: 'gestion-despachos', component: GestionDespachos },
      { path: 'gestion-contenedores', component: GestionContenedores },
      { path: 'gestion-incidencias', component: GestionIncidencias },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
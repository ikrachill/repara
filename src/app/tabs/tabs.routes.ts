import type { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'solicitudes',
        loadComponent: () => import('../pages/solicitudes/solicitudes.page').then((m) => m.SolicitudesPage),
      },
      {
        path: 'presupuestos',
        loadComponent: () => import('../pages/presupuestos/presupuestos.page').then((m) => m.PresupuestosPage),
      },
      {
        path: 'seguimiento',
        loadComponent: () => import('../pages/seguimiento/seguimiento.page').then((m) => m.SeguimientoPage),
      },
      {
        path: '',
        redirectTo: '/tabs/solicitudes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/solicitudes',
    pathMatch: 'full',
  },
];

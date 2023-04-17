import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './modules/Login/layout/main-login/main-login.component';

const routes: Routes = [
  // App Routes
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/components/Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'estadisticas',
    //! Activar Guard
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/components/Stadistics/stadistics.module').then(
        (m) => m.StadisticsModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/components/Products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'suscriptores',
    loadChildren: () =>
      import('./modules/Subscriptors/subscriptors.module').then(
        (m) => m.SubscriptorsModule
      ),
  },
  {
    path: 'pagos',
    loadChildren: () =>
      import('./modules/components/Payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/components/Settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'rutinas',
    loadChildren: () =>
      import('./modules/components/Rutines/rutines.module').then(
        (m) => m.RutinesModule
      ),
  },

  // Auth Routes
  {
    path: 'login',
    component: MainLoginComponent,
    children: [
      {
        path: '',
        // redirectTo: 'login',
        loadChildren: () =>
          import('./modules/Login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

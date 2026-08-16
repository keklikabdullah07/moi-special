import { Routes } from '@angular/router';
import { CustomerShellComponent } from './pages/customer/customer-shell.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashboardPageComponent } from './pages/admin/admin-dashboard-page/admin-dashboard-page.component';
import { AdminInventoryPageComponent } from './pages/admin/admin-inventory-page/admin-inventory-page.component';
import { AdminFinancePageComponent } from './pages/admin/admin-finance-page/admin-finance-page.component';
import { AdminPersonnelPageComponent } from './pages/admin/admin-personnel-page/admin-personnel-page.component';
import { AdminOrdersPageComponent } from './pages/admin/admin-orders-page/admin-orders-page.component';
import { AdminCrmPageComponent } from './pages/admin/admin-crm-page/admin-crm-page.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: CustomerShellComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: '',
        component: AdminDashboardPageComponent
      },
      {
        path: 'inventory',
        component: AdminInventoryPageComponent
      },
      {
        path: 'finance',
        component: AdminFinancePageComponent
      },
      {
        path: 'personnel',
        component: AdminPersonnelPageComponent
      },
      {
        path: 'orders',
        component: AdminOrdersPageComponent
      },
      {
        path: 'crm',
        component: AdminCrmPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

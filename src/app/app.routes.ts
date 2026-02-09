import { Routes } from '@angular/router';
import { About } from './about/about';
import { Account } from './account/account';
import { Contact } from './contact/contact';
import { FaqComponent } from './faq/faq.component';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Products } from './products/products';
import { Checkout } from './checkout/checkout';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { Stores } from './stores/stores';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'account',
    component: Account
  },
  {
    path: 'account/orders',
    loadComponent: () =>
      import('./orders-history/orders-history.component').then(m => m.OrdersHistoryComponent)
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'stores',
    component: Stores
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'products',
    component: Products
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'checkout',
    component: Checkout
  },
  {
    path: 'order-confirmed',
    component: OrderConfirmationComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'lost',
    loadComponent: () =>
      import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'lost',
    pathMatch: 'full'
  }
];

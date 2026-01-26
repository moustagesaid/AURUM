import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Products } from './products/products';
import { Checkout } from './checkout/checkout';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

export const routes: Routes = [
  {
    path: '',
    component: Home
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
  }
];

import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Login } from './login/login';
import { Products } from './products/products';
import { Checkout } from './checkout/checkout';

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
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

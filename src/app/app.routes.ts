import { Routes } from '@angular/router';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Login } from './login/login';
import { Products } from './products/products';

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
  }
];

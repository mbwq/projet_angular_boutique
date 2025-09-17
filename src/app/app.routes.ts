import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { Login } from './components/login/login';

export const routes: Routes = [

    { path: '', component:Homepage},
    { path: 'Login', component: Login} //la route login(page de connexion)
];

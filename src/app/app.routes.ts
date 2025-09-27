import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { Login } from './components/login/login';
import { Signin } from './components/signin/signin';

export const routes: Routes = [

    { path: '', component:Homepage}, //route par defaut
    { path: 'Login', component:Login}, //la route login(page de connexion)
    { path: 'Signin', component:Signin} //la route sign-in(page de creation de compte)
];

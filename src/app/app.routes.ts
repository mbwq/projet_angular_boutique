import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { Login } from './components/login/login';
import { Signin } from './components/signin/signin';
import { Panier } from './components/panier/panier';
import { Maillot } from './components/maillot/maillot';
import { Echarpe } from './components/echarpe/echarpe';
import { Accessoire } from './components/accessoire/accessoire';
import { Dashboard } from './admin/dashboard/dashboard';
import { Setting } from './components/setting/setting';
import { Restock } from './admin/restock/restock';
import { authGuard } from './helper/auth-guard';
import { Update } from './components/update/update';


export const routes: Routes = [

    { path: '', component:Homepage}, //route par defaut
    { path: 'Login', component:Login}, //la route login(page de connexion)
    { path: 'Signin', component:Signin}, //la route sign-in(page de creation de compte)
    { path: 'Panier', component:Panier}, //la route basket(valider les produits)
    { path: 'maillots', component:Maillot}, //la route categorie maillot
    { path: 'accessoires', component:Accessoire},//route accessoire porte cle ou autre décoration
    { path: 'echarpes', component:Echarpe},//route des echarpe
    { path: 'admin/dashboard', component:Dashboard, canActivate: [authGuard]},// route de tableau bord reserve au admin
    { path: 'Setting', component:Setting}, //route paramètre compte utilisateur
    { path: 'Restoke', component:Restock},
    { path: 'EditUser', component:Update} //route mis a jour info utilisateur
];

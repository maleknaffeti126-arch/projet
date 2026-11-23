import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil.component';
import { BoutiqueComponent } from './pages/boutique.component';
import { PersonnalisationComponent } from './pages/personnalisation.component';
import { BoxComponent } from './pages/box.component';
import { PanierComponent } from './pages/panier.component';
import { AdminComponent } from './pages/admin.component';

export const routes: Routes = [
  {path:'', component:AccueilComponent, title:'Accueil | Les Deux Petites Gourmandes'},
  {path:'boutique', component:BoutiqueComponent, title:'Boutique'},
  {path:'personnalisation', component:PersonnalisationComponent, title:'Personnalisation'},
  {path:'box', component:BoxComponent, title:'Box gourmande'},
  {path:'panier', component:PanierComponent, title:'Mon panier'},
  {path:'admin', component:AdminComponent, title:'Administration'},
  {path:'**', redirectTo:''}
];

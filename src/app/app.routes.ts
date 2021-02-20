import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdministratorComponent},
  { path: 'perfil/:id', component: PerfilComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash:true });

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PersonagemFormComponent } from './views/personagem-form/personagem-form.component';
import { PersonagensComponent } from './views/personagens/personagens.component';

const routes: Routes = [
  { path: 'create', component: PersonagemFormComponent },
  { path: 'personagens', component: PersonagensComponent, loadChildren: ()=>import('./views/personagens/personagens.module').then(m=>m.PersonagensModule) },
  { path: 'dashboard', component: DashboardComponent},
  { path:'', pathMatch:'full', redirectTo: 'personagens' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CharacterComponent } from './views/character/character.component';
import { CharactersComponent } from './views/characters/characters.component';
import { CharactersResolver } from './views/characters/guards/characters.resolver';

const routes: Routes = [
  { path: 'dashboard', component: CharactersComponent, resolve:{gameSettings:CharactersResolver}},
  { path: 'personagens', children: [
    { path:':id', component: CharacterComponent, },
  ]},
  { path:'', pathMatch:'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

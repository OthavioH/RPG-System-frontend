import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestDiceComponent } from './test-dice/test-dice.component';

import { CharacterComponent } from './views/character/character.component';
import { CharacterResolver } from './views/character/guards/character.resolver';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardResolver } from './views/dashboard/guards/dashboard.resolver';
import { MainPageComponent } from './views/main-page/main-page.component';

const routes: Routes = [
  { path: 'dashboard', children:[
    { path: ':id/characters', children: [
      { path:':characterId', component: CharacterComponent, resolve: {character:CharacterResolver}},
    ]},
    {path:':id',component: DashboardComponent, resolve:{gameSettings:DashboardResolver},},
  ]},
  { path: 'dice',component: TestDiceComponent,},
  { path:'', pathMatch:'full', component:MainPageComponent },
  { path: '**', pathMatch: 'full', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

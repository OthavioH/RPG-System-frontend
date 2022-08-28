import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestDiceComponent } from './test-dice/test-dice.component';
import { ThreatsDashboardComponent } from './views/threats-dashboard/threats-dashboard.component';

import { CharacterComponent } from './views/character/character.component';
import { CharacterResolver } from './views/character/guards/character.resolver';
import { CharactersComponent } from './views/characters/characters.component';
import { CharactersResolver } from './views/characters/guards/characters.resolver';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { PortraitPageComponent } from './views/portrait-page/portrait-page.component';
import { ThreatPageComponent } from './views/threat-page/threat-page.component';
import { ThreatResolver } from './views/threat-page/threat-resolver.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CharactersComponent,
    resolve: { gameSettings: CharactersResolver },
  },
  {
    path: 'threats',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: ThreatsDashboardComponent,
      },
    ],
  },
  {
    path: 'threats',
    children: [
      {
        path: ':id',
        component: ThreatPageComponent,
        resolve: { threat: ThreatResolver },
      },
    ],
  },
  { path: 'portraits', component: PortraitPageComponent },
  {
    path: 'characters',
    children: [
      {
        path: ':id',
        component: CharacterComponent,
        resolve: { character: CharacterResolver },
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

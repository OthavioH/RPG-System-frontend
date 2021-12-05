import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonagemComponent } from '../personagem/personagem.component';
import { PersonagensComponent } from './personagens.component';

const personagensRoutes: Routes = [
    { path: 'personagens', children: [
        { path:':id', component: PersonagemComponent },
        { path: '', component: PersonagensComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(personagensRoutes)],
    exports: [RouterModule]
})
export class PersonagensRoutingModule { }
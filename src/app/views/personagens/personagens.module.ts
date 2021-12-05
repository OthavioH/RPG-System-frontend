import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { PersonagemFormComponent } from '../personagem-form/personagem-form.component';
import { PersonagemComponent } from '../personagem/personagem.component';
import { PersonagensRoutingModule } from './personagens-routing.module';
import { PersonagensComponent } from './personagens.component';

@NgModule({
  declarations: [
    PersonagensComponent,
    PersonagemFormComponent,
    PersonagemComponent
  ],
  imports: [
    CommonModule,
    PersonagensRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule
  ]
})
export class PersonagensModule { }

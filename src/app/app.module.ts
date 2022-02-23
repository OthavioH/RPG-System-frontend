import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharactersComponent } from './views/characters/characters.component';
import { CharacterComponent } from './views/character/character.component';
import { SkillsDialogComponent } from './views/common/skills-dialog/skills-dialog.component';
import { RollDiceDialogComponent } from './views/common/roll-dice-dialog/roll-dice-dialog.component';
import { CreateCharacterDialogComponent } from './views/common/create-character-dialog/create-character-dialog.component';
import { EditGamePreferenceDialogComponent } from './views/common/edit-game-preference-dialog/edit-game-preference-dialog.component';
import { ProgressBarComponent } from './views/common/progress-bar/progress-bar.component';
import { EditProgressBarValuesDialogComponent } from './views/common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { FormsModule } from '@angular/forms';
import { OpenChooseAttributesDialogComponent } from './views/common/open-choose-attributes-dialog/open-choose-attributes-dialog.component';
import { OpenChooseSkillsDialogComponent } from './views/common/open-choose-skills-dialog/open-choose-skills-dialog.component';
import { AttributeDialogComponent } from './views/common/attribute-dialog/attribute-dialog.component';
import { DeleteCharacterDialogComponent } from './views/common/delete-character-dialog/delete-character-dialog.component';
import { CreateEquipmentDialogComponent } from './views/common/create-equipment-dialog/create-equipment-dialog.component';
import { CreateWeaponDialogComponent } from './views/common/create-weapon-dialog/create-weapon-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CharactersComponent,
    CharacterComponent,
    SkillsDialogComponent,
    RollDiceDialogComponent,
    CreateCharacterDialogComponent,
    EditGamePreferenceDialogComponent,
    ProgressBarComponent,
    EditProgressBarValuesDialogComponent,
    OpenChooseAttributesDialogComponent,
    OpenChooseSkillsDialogComponent,
    AttributeDialogComponent,
    DeleteCharacterDialogComponent,
    CreateEquipmentDialogComponent,
    CreateWeaponDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
  ],
  providers: [],
  exports: [
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

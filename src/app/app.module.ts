import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './views/characters/characters.component';
import { CharacterComponent } from './views/character/character.component';
import { SkillsDialogComponent } from './views/common/skills-dialog/skills-dialog.component';
import { RollDiceDialogComponent } from './views/common/dice-rolling/roll-dice-dialog/roll-dice-dialog.component';
import { CreateCharacterDialogComponent } from './views/common/create-character-dialog/create-character-dialog.component';
import { ProgressBarComponent } from './views/common/progress-bar/progress-bar.component';
import { EditProgressBarValuesDialogComponent } from './views/common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { OpenChooseSkillsDialogComponent } from './views/common/open-choose-skills-dialog/open-choose-skills-dialog.component';
import { AttributeDialogComponent } from './views/common/attribute-dialog/attribute-dialog.component';
import { DeleteCharacterDialogComponent } from './views/common/delete-character-dialog/delete-character-dialog.component';
import { CreateEquipmentDialogComponent } from './views/common/create-equipment-dialog/create-equipment-dialog.component';
import { CreateWeaponDialogComponent } from './views/common/create-weapon-dialog/create-weapon-dialog.component';
import { CharacterCardComponent } from './views/common/character-card/character-card.component';
import { EditSkillDialogComponent } from './views/common/edit-skill-dialog/edit-skill-dialog.component';
import { ShowAbilityDetailsDialogComponent } from './views/common/show-ability-details-dialog/show-ability-details-dialog.component';
import { EditAbilityDialogComponent } from './views/common/edit-ability-dialog/edit-ability-dialog.component';
import { ChooseAbilitiesDialogComponent } from './views/common/choose-abilities-dialog/choose-abilities-dialog.component';
import { CreateRitualDialogComponent } from './views/common/create-ritual-dialog/create-ritual-dialog.component';
import { EditRitualDialogComponent } from './views/common/edit-ritual-dialog/edit-ritual-dialog.component';
import { ChooseRitualsDialogComponent } from './views/common/choose-rituals-dialog/choose-rituals-dialog.component';
import { ShowRitualDialogComponent } from './views/common/show-ritual-dialog/show-ritual-dialog.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TestDiceComponent } from './test-dice/test-dice.component';
import { ChangeCharacterImageDialogComponent } from './views/common/change-character-image-dialog/change-character-image-dialog.component';
import { DiceRollAnimationComponent } from './views/common/dice-rolling/dice-roll-animation/dice-roll-animation.component';
import { DiceAnimationComponent } from './views/common/dice-rolling/dice-animation/dice-animation.component';
import { ToRomanNumeralPipe } from './to-roman-numeral.pipe';
import { EditInventoryDialogComponent } from './views/common/edit-inventory-dialog/edit-inventory-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RollAttributeDialogComponent } from './views/common/roll-attribute-dialog/roll-attribute-dialog.component';
import { EditWeaponDialogComponent } from './views/common/edit-weapon-dialog/edit-weapon-dialog.component';
import { PortraitPageComponent } from './views/portrait-page/portrait-page.component';
import { PortraitCardComponent } from './views/portrait-page/portrait-card/portrait-card.component';
import { InitiativeListComponent } from './views/shared/initiative-list/initiative-list.component';
import { ThreatsDashboardComponent } from './views/threats-dashboard/threats-dashboard.component';
import { ThreatsCardComponent } from './views/common/threats-card/threats-card.component';
import { CreateThreatDialogComponent } from './views/common/create-threat-dialog/create-threat-dialog.component';
import { ThreatPageComponent } from './views/threat-page/threat-page.component';
import { DeleteThreatDialogComponent } from './views/common/delete-threat-dialog/delete-threat-dialog.component';
import { CharactersResolver } from './views/characters/guards/characters.resolver';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CharactersService } from './views/characters/shared/services/characters.service';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterComponent,
    SkillsDialogComponent,
    RollDiceDialogComponent,
    CreateCharacterDialogComponent,
    ProgressBarComponent,
    EditProgressBarValuesDialogComponent,
    OpenChooseSkillsDialogComponent,
    AttributeDialogComponent,
    DeleteCharacterDialogComponent,
    CreateEquipmentDialogComponent,
    CreateWeaponDialogComponent,
    CharacterCardComponent,
    EditSkillDialogComponent,
    ShowAbilityDetailsDialogComponent,
    EditAbilityDialogComponent,
    ChooseAbilitiesDialogComponent,
    CreateRitualDialogComponent,
    EditRitualDialogComponent,
    ChooseRitualsDialogComponent,
    ShowRitualDialogComponent,
    PageNotFoundComponent,
    TestDiceComponent,
    ChangeCharacterImageDialogComponent,
    DiceRollAnimationComponent,
    DiceAnimationComponent,
    ToRomanNumeralPipe,
    EditInventoryDialogComponent,
    RollAttributeDialogComponent,
    EditWeaponDialogComponent,
    PortraitPageComponent,
    PortraitCardComponent,
    InitiativeListComponent,
    ThreatsDashboardComponent,
    ThreatsCardComponent,
    CreateThreatDialogComponent,
    ThreatPageComponent,
    DeleteThreatDialogComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
  ],
  providers: [
    CharactersService,
    CharactersResolver,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

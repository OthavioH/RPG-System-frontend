import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { RollDiceDialogComponent } from '../common/roll-dice-dialog/roll-dice-dialog.component';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/model/Character';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenChooseSkillsDialogComponent } from '../common/open-choose-skills-dialog/open-choose-skills-dialog.component';
import { OpenChooseAttributesDialogComponent } from '../common/open-choose-attributes-dialog/open-choose-attributes-dialog.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: ICharacter;
  routeSubscription: Subscription;

  onCharacterChanged:Subscription;

  constructor(
    private charactersService:CharactersService, 
    private modalService:MatDialog, 
    private activatedRoute: ActivatedRoute,
    ) {
    this.onCharacterChanged = this.charactersService.onCharacterChanged.subscribe((character: ICharacter) => {
      this.character = character;
    });

  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.data.subscribe((info: {character: ICharacter}) => {
      this.character = info.character;
    });
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill});
  }

  close(): void {
    this.modalService.closeAll();
  }

  openChooseSkills(): void {
    this.modalService.open(OpenChooseSkillsDialogComponent, {data:this.character.skills});
  }

  openChooseAttributes(): void {
    this.modalService.open(OpenChooseAttributesDialogComponent, {data:{character:this.character}});
  }

  async saveCharacter(){
    await this.charactersService.updateCharacter(this.character);
  }

  openEditHPDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, isHP:true}});
  }

  openEditSanityDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, isHP:false}});
  }

  deleteSkill(skillId: number): void {
    this.character.skills = this.character.skills.filter(skill => skill.id != skillId);
    this.saveCharacter();
  }

  deleteAttribute(attributeId: number) {
    this.character.attributes = this.character.attributes.filter(attribute => attribute.id != attributeId);
    this.saveCharacter();
  }
}

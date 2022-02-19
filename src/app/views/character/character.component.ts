import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { RollDiceDialogComponent } from '../common/roll-dice-dialog/roll-dice-dialog.component';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CaracthersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/model/Character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  attributeList: IAttribute[];
  skillList: ISkill[];

  character: ICharacter;

  constructor(private charactersService:CaracthersService, private modalService:MatDialog) {

  }

  ngOnInit(): void {
    this.character = {
      id:1,
      nome:'okasdoka',
      hp:25,
      hpTotal: 30,
      sanity: 15,
      sanityTotal: 30,
    };
    this.attributeList = this.charactersService.getAttributeList();
    this.skillList = this.charactersService.getSkillList();
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill, });
  }

  close(): void {
    this.modalService.closeAll();
  }

  openRollDiceDialog(): void {
    this.modalService.open(RollDiceDialogComponent);
  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }
}

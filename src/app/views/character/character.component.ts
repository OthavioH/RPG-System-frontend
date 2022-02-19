import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { RollDiceDialogComponent } from '../common/roll-dice-dialog/roll-dice-dialog.component';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CaracthersService } from '../characters/shared/services/characters.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  attributeList: IAttribute[];
  skillList: ISkill[];

  selectedSkill: ISkill;
  selectedAttribute: ISkill;

  constructor(private charactersService:CaracthersService, private modalService:MatDialog) {

  }

  ngOnInit(): void {
    this.attributeList = this.charactersService.getAttributeList();
    this.skillList = this.charactersService.getSkillList();
  }

  dismissDialog(): boolean {
    this.selectedSkill = null;
    this.selectedAttribute = null;
    return true;
  }

  openSkillDialog(skill: ISkill): void {
    this.selectedSkill = skill;
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

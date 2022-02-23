import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISkill } from 'src/models/Skill';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/models/Character';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenChooseAttributesDialogComponent } from '../common/open-choose-attributes-dialog/open-choose-attributes-dialog.component';
import { OpenChooseSkillsDialogComponent } from '../common/open-choose-skills-dialog/open-choose-skills-dialog.component';
import { AttributeDialogComponent } from '../common/attribute-dialog/attribute-dialog.component';
import { IAttribute } from 'src/models/Attribute';
import { IWeapon } from 'src/models/Weapon';
import { IEquipment } from 'src/models/Equipment';
import { CreateEquipmentDialogComponent } from '../common/create-equipment-dialog/create-equipment-dialog.component';
import { CreateWeaponDialogComponent } from '../common/create-weapon-dialog/create-weapon-dialog.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss','./../../app.component.scss']
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
      this.character.attributes = character.attributes != null ? character.attributes.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.character.skills = character.skills != null ? character.skills.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.character.equipments = character.equipments  ?? [];
      this.character.weapons = character.weapons ?? [];
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

  openCreateEquipmentDialog(): void {
    this.modalService.open(CreateEquipmentDialogComponent, {data:{character: this.character}});
  }

  openCreateWeaponDialog(): void {
    this.modalService.open(CreateWeaponDialogComponent, {data:{character: this.character}});
  }

  openAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(AttributeDialogComponent, {data: attribute});
  }

  onChangedAttributeValue(attributeId:string, newAttributeValue:number):void{
    for (const attribute of this.character.attributes) {
      if (attribute.id == attributeId) {
        attribute.value = newAttributeValue;
      }
    }
  }

  onChangedSkillValue(skillId:string, newSkillValue:number):void{
    for (const skill of this.character.skills) {
      if (skill.id == skillId) {
        skill.value = newSkillValue;
      }
    }
  }

  close(): void {
    this.modalService.closeAll();
  }

  openChooseSkills(): void {
    this.modalService.open(OpenChooseSkillsDialogComponent, {data:{character:this.character}});
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

  deleteSkill(skillId: string): void {
    this.character.skills = this.character.skills.filter(skill => skill.id != skillId);
    this.saveCharacter();
  }

  deleteEquipment(equipmentId: string): void {
    this.character.equipments = this.character.equipments.filter(equipment => equipment.id != equipmentId);
    this.saveCharacter();
  }

  deleteWeapon(weaponId: string): void {
    this.character.weapons = this.character.weapons.filter(weapon => weapon.id != weaponId);
    this.saveCharacter();
  }

  deleteAttribute(attributeId: string) {
    this.character.attributes = this.character.attributes.filter(attribute => attribute.id != attributeId);
    this.saveCharacter();
  }
}

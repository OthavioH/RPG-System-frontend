import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISkill } from 'src/models/Skill';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/models/Character';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, } from '@angular/router';
import { OpenChooseAttributesDialogComponent } from '../common/open-choose-attributes-dialog/open-choose-attributes-dialog.component';
import { OpenChooseSkillsDialogComponent } from '../common/open-choose-skills-dialog/open-choose-skills-dialog.component';
import { AttributeDialogComponent } from '../common/attribute-dialog/attribute-dialog.component';
import { IAttribute } from 'src/models/Attribute';
import { CreateEquipmentDialogComponent } from '../common/create-equipment-dialog/create-equipment-dialog.component';
import { CreateWeaponDialogComponent } from '../common/create-weapon-dialog/create-weapon-dialog.component';
import { Title } from '@angular/platform-browser';
import { CharacterStats } from 'src/models/CharacterStats';
import { ShowAbilityDetailsDialogComponent } from '../common/show-ability-details-dialog/show-ability-details-dialog.component';
import { IAbility } from 'src/models/Ability';
import { ChooseAbilitiesDialogComponent } from '../common/choose-abilities-dialog/choose-abilities-dialog.component';
import { ChooseRitualsDialogComponent } from '../common/choose-rituals-dialog/choose-rituals-dialog.component';
import { IRitual } from 'src/models/Ritual';
import { ShowRitualDialogComponent } from '../common/show-ritual-dialog/show-ritual-dialog.component';

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
    private titleService: Title,
    ) {
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.data.subscribe((info: {character: ICharacter}) => {
      this.character = info.character;
      this.titleService.setTitle(`Personagem | ${this.character.name}`); 
      console.log(this.character.skills);
    });
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill});
  }

  openShowAbilityDetailsDialog(ability: IAbility): void {
    this.modalService.open(ShowAbilityDetailsDialogComponent, {data: ability});
  }

  openShowRitualDetailsDialog(ritual: IRitual): void {
    this.modalService.open(ShowRitualDialogComponent, {data: ritual});
  }

  openCreateInventoryItemDialog(): void {
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

  onSelectSkillExperienceLevel(newExperienceLevel:any, newSkill:ISkill):void {
    for (const skill of this.character.skills) {
      if (skill.id == newSkill.id) {
        skill.experienceLevel = newExperienceLevel;
      }
    }
  }

  close(): void {
    this.modalService.closeAll();
  }

  openChooseSkills(): void {
    this.modalService.open(OpenChooseSkillsDialogComponent, {data:{character:this.character}});
  }

  openChooseAbilities(): void {
    this.modalService.open(ChooseAbilitiesDialogComponent, {data:{character:this.character}});
  }

  openChooseRituals(): void {
    this.modalService.open(ChooseRitualsDialogComponent, {data:{character:this.character}});
  }

  openChooseAttributes(): void {
    this.modalService.open(OpenChooseAttributesDialogComponent, {data:{character:this.character}});
  }

  async saveCharacter(){
    await this.charactersService.updateCharacter(this.character);
  }

  openEditHPDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, characterStats:CharacterStats.hp}});
  }

  openEditSanityDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, characterStats:CharacterStats.sanity}});
  }

  openEditProgressBarValueDialog(stats:string): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{
      data:{
        character: this.character, characterStats:stats
      }
    },);
  }

  deleteSkill(skillId: string): void {
    this.character.skills = this.character.skills.filter(skill => skill.id != skillId);
    this.saveCharacter();
  }

  deleteAbility(abilityId: string): void {
    this.character.abilities = this.character.abilities.filter(abilities => abilities.id != abilityId);
    this.saveCharacter();
  }

  deleteRitual(ritualId: string): void {
    this.character.rituals = this.character.rituals.filter(ritual => ritual.id != ritualId);
    this.saveCharacter();
  }

  deleteInventoryItem(itemId: string,): void {
    this.character.inventory.items = this.character.inventory.items.filter(item => item.id != itemId);
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

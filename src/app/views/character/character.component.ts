import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISkill } from 'src/models/Skill';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/models/Character';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, } from '@angular/router';
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
import { ChangeCharacterImageDialogComponent } from 'src/app/views/common/change-character-image-dialog/change-character-image-dialog.component';
import { InventoryItem } from 'src/models/InventoryItem';
import { EditInventoryDialogComponent } from '../common/edit-inventory-dialog/edit-inventory-dialog.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss','./../../app.component.scss']
})
export class CharacterComponent implements OnInit {

  character: ICharacter;
  routeSubscription: Subscription;
  removeIntentoryStream:BehaviorSubject<InventoryItem>;

  onCharacterChanged:Subscription;

  imgUrl:string;
  defaultImgUrl:string = '/../../assets/unknown_character_transparent.png';

  constructor(
    private charactersService:CharactersService, 
    private modalService:MatDialog, 
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    ) {
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.data.subscribe((info: {character: ICharacter}) => {
      this.character = new ICharacter(this.charactersService, info.character);
      this.sortListsAlphabetically();
      this.initInventoryMaxSlots();
      this.titleService.setTitle(`Personagem | ${this.character.name}`); 
      this.imgUrl = this.character.profileImageUrl ?? this.defaultImgUrl;
      
    });
    
    this.removeIntentoryStream.subscribe((item)=>{
      this.deleteInventoryItem(item.id);
    });
  }

  sortListsAlphabetically(){
    if (this.character.skills != null) {
      this.character.skills = this.character.skills.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (this.character.abilities != null) {
      this.character.abilities = this.character.abilities.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (this.character.rituals != null) {
      this.character.rituals = this.character.rituals.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  initInventoryMaxSlots() {
    const strength = this.character.attributes.strength.value;
    
    this.character.inventory.maxSlots = 5 * strength;
  }

  onImageError(event) {
    event.target.src = this.defaultImgUrl;
  }

  onChangeItemSlot(itemToUpdate:InventoryItem, slots:number) {
    for (let index = 0; index < this.character.inventory.items.length; index++) {
      const item = this.character.inventory.items[index];
      if (item.id == itemToUpdate.id) {
        item.slots = slots;
      }
    }
  }

  onChangedAttributeValue(attribute:string, newAttributeValue:number):void{
    switch (
      attribute.toLowerCase()
    ) {
      case 'for':
        this.character.attributes.strength.value = newAttributeValue;
        break;
      case 'agi':
        this.character.attributes.agility.value = newAttributeValue;
        break;
      case 'int':
        this.character.attributes.intelligence.value = newAttributeValue;
        
        break;
      case 'pre':
        this.character.attributes.presence.value = newAttributeValue;
        break;
      case 'vig':
        this.character.attributes.vigor.value = newAttributeValue;
        break;
      default:
        break;
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

  async saveCharacter(){
    await this.character.saveCharacter();
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

  openChooseSkills(): void {
    this.modalService.open(OpenChooseSkillsDialogComponent, {data:{character:this.character}});
  }

  openChooseAbilities(): void {
    this.modalService.open(ChooseAbilitiesDialogComponent, {data:{character:this.character}});
  }

  openChooseRituals(): void {
    this.modalService.open(ChooseRitualsDialogComponent, {data:{character:this.character}});
  }

  openEditHPDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, characterStats:CharacterStats.hp}});
  }

  openEditSanityDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent,{data:{character: this.character, characterStats:CharacterStats.sanity}});
  }

  openEditInventoryDialog(item:InventoryItem) {
    this.modalService.open(EditInventoryDialogComponent,{data:{item:item,character:this.character}});
  }

  openChangeCharacterImgDialog():void {
    this.modalService.open(ChangeCharacterImageDialogComponent,{data:this.character});
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
    this.character.saveCharacter();
  }

  deleteAbility(abilityId: string): void {
    this.character.abilities = this.character.abilities.filter(abilities => abilities.id != abilityId);
    this.character.saveCharacter();
  }

  deleteRitual(ritualId: string): void {
    this.character.rituals = this.character.rituals.filter(ritual => ritual.id != ritualId);
    this.character.saveCharacter();
  }

  deleteInventoryItem(itemId: string,): void {
    this.character.inventory.items = this.character.inventory.items.filter(item => item.id != itemId);
    this.character.saveCharacter();
  }

  deleteWeapon(weaponId: string): void {
    this.character.weapons = this.character.weapons.filter(weapon => weapon.id != weaponId);
    this.character.saveCharacter();
  }

  close(): void {
    this.modalService.closeAll();
  }
}

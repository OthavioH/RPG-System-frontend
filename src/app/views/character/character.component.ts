import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISkill } from 'src/models/Skill';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from 'src/models/Character';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
import { RollAttributeDialogComponent } from '../common/roll-attribute-dialog/roll-attribute-dialog.component';
import { IWeapon } from 'src/models/Weapon';
import { EditWeaponDialogComponent } from '../common/edit-weapon-dialog/edit-weapon-dialog.component';
import {
  EditWeapon,
  DeleteWeapon,
  EditWeaponDialogAction,
} from '../../../models/EditWeaponDialogAction';
import { generateRandomId } from '../common/view_utils';
import { GameSettingsService } from '../../game-settings.service';
import getCharacterRituals from 'src/app/utils/getCharacterRituals';
import getCharacterAbilities from 'src/app/utils/getCharacterAbilities';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss', './../../app.component.scss'],
})
export class CharacterComponent implements OnInit {
  character: ICharacter;
  characterRituals: IRitual[];
  characterAbilities: IAbility[];

  routeSubscription: Subscription;

  onCharacterChanged: Subscription;

  imgUrl: string;
  defaultImgUrl: string = '/../../assets/unknown_character_transparent.png';

  constructor(
    private charactersService: CharactersService,
    private modalService: MatDialog,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private gameSettingsService: GameSettingsService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.data.subscribe(
      (info: { character: ICharacter }) => {
        this.character = new ICharacter(this.charactersService, info.character);
        getCharacterRituals(this.character, this.gameSettingsService).then(
          (rituals) => {
            this.characterRituals = rituals;
          }
        );

        getCharacterAbilities(this.character, this.gameSettingsService).then(
          (abilities) => {
            this.characterAbilities = abilities;
          }
        );

        this.titleService.setTitle(`Personagem | ${this.character.name}`);
        this.imgUrl = this.character.profileImageUrl ?? this.defaultImgUrl;
      }
    );
  }

  onImageError(event) {
    event.target.src = this.defaultImgUrl;
  }

  onChangeItemSlot(itemToUpdate: InventoryItem, slots: number) {
    for (
      let index = 0;
      index < this.character.inventory.items.length;
      index++
    ) {
      const item = this.character.inventory.items[index];
      if (item.id == itemToUpdate.id) {
        item.slots = slots;
      }
    }
  }

  onStrengthAttributeChanged(): void {
    this.character.inventory.maxSlots =
      5 * this.character.attributes.strength.value;
  }

  async onDoubleClickAttribute(attribute: IAttribute): Promise<void> {
    const attributeValue = attribute.value <= 0 ? 2 : attribute.value;
    const diceResults = this.getDicesResults(attributeValue);
    this.modalService.open(RollAttributeDialogComponent, {
      data: { diceResultList: diceResults, hasToSum: false },
    });
    for (let i = 0; i < diceResults.length; i++) {
      const diceValue = diceResults[i];
      await this.gameSettingsService.addNewRoll({
        id: generateRandomId(),
        characterName: this.character.name,
        diceResult: diceValue,
        diceFaces: 20,
      });
    }
  }

  getDicesResults(diceQuantity: number): number[] {
    var diceResultList: number[] = [];
    for (let i = 0; i < diceQuantity; i++) {
      const result = this.getRandom(20);
      diceResultList.push(result);
    }
    return diceResultList;
  }

  getRandom(max: number): number {
    return Math.floor(Math.random() * max + 1);
  }

  onChangedSkillValue(skillId: string, newSkillValue: number): void {
    for (const skill of this.character.skills) {
      if (skill.id == skillId) {
        skill.value = newSkillValue;
      }
    }
  }

  async saveCharacter() {
    await this.character.saveCharacter();
  }

  openEditWeaponDialog(weapon: IWeapon): void {
    const dialogRef = this.modalService.open(EditWeaponDialogComponent, {
      data: weapon,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result instanceof EditWeaponDialogAction) {
        if (result instanceof EditWeapon) {
          this.character.updateWeapon(result.weapon);
        } else if (result instanceof DeleteWeapon) {
          this.character.deleteWeapon(result.weapon);
        }
      }
    });
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, { data: skill });
  }

  openShowAbilityDetailsDialog(ability: IAbility): void {
    this.modalService.open(ShowAbilityDetailsDialogComponent, {
      data: ability,
    });
  }

  openShowRitualDetailsDialog(ritual: IRitual): void {
    this.modalService.open(ShowRitualDialogComponent, { data: ritual });
  }

  openCreateInventoryItemDialog(): void {
    this.modalService.open(CreateEquipmentDialogComponent, {
      data: { character: this.character },
    });
  }

  openCreateWeaponDialog(): void {
    this.modalService.open(CreateWeaponDialogComponent, {
      data: { character: this.character },
    });
  }

  openAttributeDialog(): void {
    this.modalService.open(AttributeDialogComponent, { data: this.character });
  }

  openChooseSkills(): void {
    this.modalService.open(OpenChooseSkillsDialogComponent, {
      data: { character: this.character },
    });
  }

  openChooseAbilities(): void {
    this.modalService.open(ChooseAbilitiesDialogComponent, {
      data: { character: this.character },
    });
  }

  openChooseRituals(): void {
    this.modalService.open(ChooseRitualsDialogComponent, {
      data: { character: this.character },
    });
  }

  openEditHPDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent, {
      data: { character: this.character, characterStats: CharacterStats.hp },
    });
  }

  openEditSanityDialog(): void {
    this.modalService.open(EditProgressBarValuesDialogComponent, {
      data: {
        character: this.character,
        characterStats: CharacterStats.sanity,
      },
    });
  }

  openEditInventoryDialog(item: InventoryItem) {
    this.modalService.open(EditInventoryDialogComponent, {
      data: { item: item, character: this.character },
    });
  }

  openChangeCharacterImgDialog(): void {
    const dialogResponse = this.modalService.open(
      ChangeCharacterImageDialogComponent,
      { data: this.character.profileImageUrl }
    );
    dialogResponse.afterClosed().subscribe((newImgUrl) => {
      if (newImgUrl) {
        this.character.profileImageUrl = newImgUrl;
        this.character.saveCharacter();
      }
    });
  }

  openEditProgressBarValueDialog(stats: string): void {
    var currentValue = 0;
    var maxValue = 0;
    switch (stats) {
      case CharacterStats.hp:
        currentValue = this.character.hp;
        maxValue = this.character.maxHp;
        break;
      case CharacterStats.sanity:
        currentValue = this.character.sanity;
        maxValue = this.character.maxSanity;
        break;
      case CharacterStats.stressPoints:
        currentValue = this.character.effortPoints;
        maxValue = this.character.maxEffortPoints;
        break;
    }
    const dialogResponse = this.modalService.open(
      EditProgressBarValuesDialogComponent,
      {
        data: {
          currentValue: currentValue,
          maxValue: maxValue,
        },
      }
    );

    dialogResponse
      .afterClosed()
      .subscribe(
        (dialogResponse: { currentValue: number; maxValue: number }) => {
          if (dialogResponse != null) {
            if (stats == 'hp') {
              this.character.hp = dialogResponse.currentValue;
              this.character.maxHp = dialogResponse.maxValue;
            } else if (stats == 'sanity') {
              this.character.sanity = dialogResponse.currentValue;
              this.character.maxSanity = dialogResponse.maxValue;
            } else if (stats == 'stressPoints') {
              this.character.effortPoints = dialogResponse.currentValue;
              this.character.maxEffortPoints = dialogResponse.maxValue;
            }
            this.character.saveCharacter();
          }
        }
      );
  }

  deleteSkill(skillId: string): void {
    this.character.skills = this.character.skills.filter(
      (skill) => skill.id != skillId
    );
    this.character.saveCharacter();
  }

  deleteAbility(abilityId: string): void {
    this.character.abilities = this.character.abilities.filter(
      (ability) => ability != abilityId
    );
    this.character.saveCharacter();
  }

  deleteRitual(deletedRitualID: string): void {
    this.character.rituals = this.character.rituals.filter(
      (ritualID) => ritualID != deletedRitualID
    );
    this.character.saveCharacter();
  }

  deleteInventoryItem(itemId: string): void {
    this.character.inventory.items = this.character.inventory.items.filter(
      (item) => item.id != itemId
    );
    this.character.saveCharacter();
  }

  close(): void {
    this.modalService.closeAll();
  }
}

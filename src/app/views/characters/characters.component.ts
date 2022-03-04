import {Title} from "@angular/platform-browser"
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { CharactersService } from './shared/services/characters.service';
import { EditAttributeDialogComponent } from '../common/edit-attribute-dialog/edit-attribute-dialog.component';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { AttributeDialogComponent } from '../common/attribute-dialog/attribute-dialog.component';
import { EditSkillDialogComponent } from 'src/app/views/common/edit-skill-dialog/edit-skill-dialog.component';
import { ICharacter } from 'src/models/Character';
import { IAttribute } from 'src/models/Attribute';
import { ISkill } from 'src/models/Skill';
import { CreateCharacterDialogComponent } from '../common/create-character-dialog/create-character-dialog.component';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { IAbility } from "src/models/Ability";
import { ShowAbilityDetailsDialogComponent } from "../common/show-ability-details-dialog/show-ability-details-dialog.component";
import { EditAbilityDialogComponent } from "../common/edit-ability-dialog/edit-ability-dialog.component";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss','./../../app.component.scss']
})
export class CharactersComponent implements OnInit {

  subscribe: Subscription;
  gameSettingsSubscription: Subscription;
  charactersSubscription: Subscription;
  charactersList: ICharacter[] = [];
  attributeList: IAttribute[] = [];
  gameSettings: IGameSettings;
  skillList: ISkill[] = [];
  loading: boolean = true;

  constructor(
    private charactersService: CharactersService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameSettingsService: GameSettingsService,
    private titleService: Title, private modalService:MatDialog) { 
    this.router.events.subscribe((event: RouterEvent) =>{
      if (event instanceof NavigationStart || event instanceof NavigationError) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel ) {
        this.loading = false;
      }
    });

    this.gameSettingsSubscription = this.gameSettingsService.updateGameSettingsEvent$.subscribe(newGameSettings => {
      this.gameSettings = newGameSettings;
      this.attributeList = this.gameSettings.attributes != null ? this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.skillList = this.gameSettings.skills != null ? this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name)) : [];
    });

    this.charactersService.getCharacters();

    this.charactersSubscription = this.charactersService.onCharacterListChanged.subscribe((newCharactersList:ICharacter[]) =>{
      this.charactersList = newCharactersList;
    });
    
    this.titleService.setTitle("Dashboard | RPG System");
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.subscribe = this.activatedRoute.data.subscribe((info: {gameSettings: IGameSettings}) => {
      this.gameSettings = info.gameSettings;
    });
    this.attributeList = this.gameSettings.attributes != null ? this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.skillList = this.gameSettings.skills != null ? this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name)) : [];
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onChangeDiceCooldown(value: number): void {
    this.gameSettings.diceCooldown = value;
  }

  onChangeDiceScreenTime(value:number): void {
    this.gameSettings.diceScreenTime = value;
  }

  saveGameSettings() {
    this.gameSettingsService.setGameTimers(this.gameSettings.diceCooldown, this.gameSettings.diceScreenTime);
  }

  createNewSkill(skillName: string, skillDescription:string): void {
    this.gameSettingsService.createNewSkill(skillName, skillDescription);
    this.close();
  }

  createNewAbility(abilityName: string, abilityDescription:string): void {
    this.gameSettingsService.createNewAbility(abilityName, abilityDescription);
    this.close();
  }

  createNewAttribute(attributeName: string, attributeDescription:string): void {
    this.gameSettingsService.createNewAttribute(attributeName, attributeDescription);
    this.close();
  }

  deleteAttribute(attributeId: string): void {
    this.gameSettingsService.removeAttribute(attributeId);
  }

  deleteSkill(skillId: string): void {
    this.gameSettingsService.removeSkill(skillId);
  }

  deleteAbility(abilityId: string): void {
    this.gameSettingsService.removeAbility(abilityId);
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  openEditAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(EditAttributeDialogComponent,{data:attribute})
  }

  openEditSkillDialog(skill: ISkill): void {
    this.modalService.open(EditSkillDialogComponent,{data:skill})
  }

  openEditAbilityDialog(ability: IAbility): void {
    this.modalService.open(EditAbilityDialogComponent,{data:ability})
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill});
  }

  openAbilityDialog(ability: ISkill): void {
    this.modalService.open(ShowAbilityDetailsDialogComponent, {data: ability});
  }

  openAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(AttributeDialogComponent, {data: attribute});
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent);
  }

  close(): void {
    this.modalService.closeAll();
  }

}

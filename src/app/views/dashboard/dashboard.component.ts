import {Title} from "@angular/platform-browser"
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { DashboardService } from './shared/services/dashboard.service';
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
import { CreateRitualDialogComponent } from "../common/create-ritual-dialog/create-ritual-dialog.component";
import { IRitual } from "src/models/Ritual";
import { EditRitualDialogComponent } from "../common/edit-ritual-dialog/edit-ritual-dialog.component";
import { findCharacterIndex } from "../common/view_utils";
import { ShowRitualDialogComponent } from "../common/show-ritual-dialog/show-ritual-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','./../../app.component.scss']
})
export class DashboardComponent implements OnInit {

  subscribe: Subscription;
  gameSettingsSubscription: Subscription;

  charactersList: ICharacter[] = [];
  attributeList: IAttribute[] = [];

  gameSettings: IGameSettings;
  skillList: ISkill[] = [];
  loading: boolean = true;

  constructor(
    private dashboardService: DashboardService, 
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

    this.gameSettingsService.onRollsListChanged$.subscribe((newRollList)=>{
      this.gameSettings.lastRolls = newRollList;
    });
    
    this.titleService.setTitle("Dashboard | RPG System");
  }

  ngOnInit(): void {
    this.subscribeObservables();
  }

  subscribeObservables(){
    this.gameSettingsSubscription = this.gameSettingsService.updateGameSettingsEvent$.subscribe(newGameSettings => {
      this.gameSettings = newGameSettings;
      this.attributeList = this.gameSettings.attributes != null ? this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.skillList = this.gameSettings.skills != null ? this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name)) : [];
      this.gameSettings.rituals = this.gameSettings.rituals != null ? this.gameSettings.rituals.sort((a,b) => a.name.localeCompare(b.name)) : [];
    });

    this.dashboardService.onCharacterListChanged$.subscribe((characterList) =>{
      this.charactersList = characterList;
    });

    this.dashboardService.onCharacterChanged$.subscribe((changedCharacter) =>{
      if (this.charactersList != null) {
        if (changedCharacter != null) {
          const index = findCharacterIndex(this.charactersList,changedCharacter);
          this.charactersList[index] = changedCharacter;
        }
      }
    });

    this.subscribe = this.activatedRoute.data.subscribe((info: {gameSettings: IGameSettings}) => {
      this.gameSettings = info.gameSettings;
      this.dashboardService.setGameId(this.gameSettings.id);
    });

    this.attributeList = this.gameSettings.attributes != null ? this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name)) : [];
    this.skillList = this.gameSettings.skills != null ? this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name)) : [];
    this.gameSettings.rituals = this.gameSettings.rituals != null ? this.gameSettings.rituals.sort((a,b) => a.name.localeCompare(b.name)) : [];

    this.dashboardService.getCharacters(this.gameSettings.id);
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
    this.gameSettingsService.setGameTimers(this.gameSettings.diceCooldown, this.gameSettings.diceScreenTime,this.gameSettings.id);
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

  deleteRitual(ritualId: string): void {
    this.gameSettingsService.removeRitual(ritualId);
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

  openEditRitualDialog(ritual: IRitual): void {
    this.modalService.open(EditRitualDialogComponent,{data:ritual})
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill});
  }
  
  openCreateRitualDialog(){
    this.modalService.open(CreateRitualDialogComponent);
  }

  openAbilityDialog(ability: IAbility): void {
    this.modalService.open(ShowAbilityDetailsDialogComponent, {data: ability});
  }

  openRitualDialog(ritual: IRitual): void {
    this.modalService.open(ShowRitualDialogComponent, {data: ritual});
  }

  openAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(AttributeDialogComponent, {data: attribute});
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent, {data:{gameId:this.gameSettings.id}});
  }

  close(): void {
    this.modalService.closeAll();
  }

}
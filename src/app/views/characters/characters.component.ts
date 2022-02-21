import { CharactersService } from './shared/services/characters.service';
import {Title} from "@angular/platform-browser"
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICharacter } from 'src/model/Character';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { CreateCharacterDialogComponent } from '../common/create-character-dialog/create-character-dialog.component';
import { GameSettingsService } from 'src/app/game-settings.service';
import { GameSettings } from 'src/model/GameSettings';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { EditGamePreferenceDialogComponent } from '../common/edit-game-preference-dialog/edit-game-preference-dialog.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  subscribe: Subscription;
  gameSettingsSubscription: Subscription;
  charactersSubscription: Subscription;
  charactersList: ICharacter[] = [];
  attributeList: IAttribute[] = [];
  gameSettings: GameSettings;
  skillList: ISkill[] = [];
  loading: boolean;

  constructor(
    private charactersService: CharactersService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameSettingsService: GameSettingsService,
    private titleService: Title, private modalService:MatDialog) { 
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart || event instanceof NavigationError) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel ) {
        this.loading = false;
      }
    });

    this.gameSettingsSubscription = this.gameSettingsService.updateGameSettingsEvent$.subscribe(newGameSettings => {
      this.gameSettings = newGameSettings;
      this.attributeList = this.gameSettings.attributes;
      this.skillList = this.gameSettings.skills;
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
    this.subscribe = this.activatedRoute.data.subscribe((info: {gameSettings: GameSettings}) => {
      this.gameSettings = info.gameSettings;
    });
    this.attributeList = this.gameSettings.attributes ?? [];
    this.skillList = this.gameSettings.skills ?? [];
  }
  
  openEditDialog(gamePreference: ISkill | IAttribute, isSkill: boolean): void {
    this.modalService.open(EditGamePreferenceDialogComponent,{data:{gamePreference:gamePreference, isSkill:isSkill}})
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

  createNewAttribute(attributeName: string, attributeDescription:string): void {
    this.gameSettingsService.createNewAttribute(attributeName, attributeDescription);
    this.close();
  }

  deleteAttribute(attributeId: number): void {
    this.gameSettingsService.removeAttribute(attributeId);
  }

  deleteSkill(skillId: number): void {
    this.gameSettingsService.removeSkill(skillId);
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent);
  }

  close(): void {
    this.modalService.closeAll();
  }

}

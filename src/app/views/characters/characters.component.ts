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
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveStart, Router, RouterEvent } from '@angular/router';
import { EditGamePreferenceDialogComponent } from '../common/edit-game-preference-dialog/edit-game-preference-dialog.component';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { AttributeDialogComponent } from '../common/attribute-dialog/attribute-dialog.component';
import { DeleteCharacterDialogComponent } from '../common/delete-character-dialog/delete-character-dialog.component';

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
  gameSettings: GameSettings;
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
      this.attributeList = this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name));;
      this.skillList = this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name));;
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
    this.attributeList = this.gameSettings.attributes.sort((a,b) => a.name.localeCompare(b.name)) ?? [];
    this.skillList = this.gameSettings.skills.sort((a,b) => a.name.localeCompare(b.name)) ?? [];
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

  openEditDialog(gamePreference: ISkill | IAttribute, isSkill: boolean): void {
    this.modalService.open(EditGamePreferenceDialogComponent,{data:{gamePreference:gamePreference, isSkill:isSkill}})
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, {data: skill});
  }

  openAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(AttributeDialogComponent, {data: attribute});
  }

  openDeleteCharacterDialog(id:number):void{
    this.modalService.open(DeleteCharacterDialogComponent, {data:id})
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent);
  }

  close(): void {
    this.modalService.closeAll();
  }

}

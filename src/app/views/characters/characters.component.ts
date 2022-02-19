import { CaracthersService } from './shared/services/characters.service';
import {Title} from "@angular/platform-browser"
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ICharacter } from 'src/model/Character';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { CreateCharacterDialogComponent } from '../common/create-character-dialog/create-character-dialog.component';
import { AppService } from 'src/app/app.service';
import { GameSettings } from 'src/model/GameSettings';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  subscribe: Subscription;
  charactersList: ICharacter[];
  attributeList: IAttribute[];
  gameSettings: GameSettings;
  skillList: ISkill[];

  constructor(
    private charactersService: CaracthersService, 
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private titleService: Title, private modalService:MatDialog) { 
    this.charactersList = this.charactersService.getCharacters();
    this.titleService.setTitle("Dashboard | RPG System");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateGameSettings();
  }

  ngOnInit(): void {
    this.subscribe = this.activatedRoute.data.subscribe((info: {gameSettings: GameSettings}) => {
      this.gameSettings = info.gameSettings;
    });
    this.attributeList = this.gameSettings.attributes;
    this.skillList = this.gameSettings.skills;
  }

  async updateGameSettings(){
    this.gameSettings = await this.appService.getGameSettings();
    this.attributeList = this.gameSettings.attributes;
    this.skillList = this.gameSettings.skills;
  }


  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onAddClick(): void {
    console.log("Adicionar novo personagem");
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent);
  }

  close(content): void {
    this.modalService.closeAll();
  }

}

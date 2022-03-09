import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import io from 'socket.io-client';
import { BehaviorSubject, Observable, ReplaySubject,} from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { generateRandomId } from 'src/app/views/common/view_utils';
import { environment } from 'src/environments/environment';
import { IAttribute } from 'src/models/Attribute';
import { InventoryItem } from 'src/models/InventoryItem';
import { ISkill } from 'src/models/Skill';
import { IWeapon } from 'src/models/Weapon';

import { ICharacter } from '../../../../../models/Character';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Socket } from 'src/models/SocketClass';
import { IGameSettings } from 'src/models/GameSettings';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private onCharacterChanged:BehaviorSubject<ICharacter> = new BehaviorSubject<ICharacter>(null);
  private onCharacterListChanged: BehaviorSubject<ICharacter[]> = new BehaviorSubject<ICharacter[]>(null);

  onCharacterChanged$ = this.onCharacterChanged.asObservable();
  onCharacterListChanged$ = this.onCharacterListChanged.asObservable();

  equipmentList : InventoryItem[] = [];
  weaponList : IWeapon[] = [];
  gameSettings: IGameSettings;

  private attributeList: IAttribute[] = [];
  private skillList: ISkill[] = [];

  private characters: ICharacter[] = [];

  constructor(
    private http:HttpClient,
    private gameSettingsService: GameSettingsService,
    private router:Router,
  ) {
    this.initSettings();
  }

  async initSettings() {
    Socket.socket.on('characterChanged',(response:{character:ICharacter,gameId:string})=>{
      if (response.gameId === this.gameSettings.id) {
        this.onCharacterChanged.next(response.character);
      }
    });
  }

  async setGameId(gameId:string){
    this.gameSettings = await this.gameSettingsService.getGameSettings(gameId);
  }

  async getCharacterById(characterId: number,gameId:string): Promise<ICharacter> {
    const response: any = await this.http.get(`${environment.apiUrl}/sheets/${characterId}?gameId=${gameId}`).toPromise();
    if (response.sheet !=null) {
      const character:ICharacter = response.sheet;
      return character;
    }

    this.router.navigate(["**"]);
  }


  async getCharacters(gameId:string){
    const response: any = await this.http.get(`${environment.apiUrl}/sheets?gameId=${gameId}`).toPromise();
    this.characters = response.sheetList;
    this.onCharacterListChanged.next(this.characters);
  }

  getSkillList(): ISkill[] {
    return this.skillList;
  }

  async deleteById(id: number, gameId:string): Promise<void> {
    await this.http.put(`${environment.apiUrl}/sheets/${id}/delete?gameId=${gameId}`,{}).toPromise();
    
    await this.getCharacters(gameId);
  }

  async updateCharacter(character: ICharacter,gameId:string) {
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/update?gameId=${gameId}`,{character:character}).toPromise();
    await this.getCharacterById(character.id,gameId);
  }

  async updateCharacterStats(character: ICharacter,gameId:string) {
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/update?gameId=${gameId}`,{character: character}).toPromise();
    this.getCharacterById(character.id,gameId);
  }

  getDefaultAttributeList() {
    this.attributeList = this.gameSettings.attributes;
    return this.attributeList;
  }

  async createNewCharacter(characterName:string,gameId:string) {
    const response = await this.http.post(`${environment.apiUrl}/sheets/create?gameId=${gameId}`,{name:characterName}).toPromise();
    await this.getCharacters(gameId);
  }

  async createNewEquipment(equipmentName: string, quantity:number, characterId:number,gameId:string) {
    await this.http.post(`${environment.apiUrl}/sheets/${characterId}/equipment/create`,{id:generateRandomId(),name:equipmentName, quantity:quantity}).toPromise();
    this.getCharacterById(characterId,gameId);
  }

  
}

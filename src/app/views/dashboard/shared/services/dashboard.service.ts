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
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Socket } from 'src/models/SocketClass';

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

  private attributeList: IAttribute[] = [];
  private skillList: ISkill[] = [];

  private characters: ICharacter[] = [];

  constructor(
    private http:HttpClient,
    private gameSettingsService: GameSettingsService,
    private router:Router,
    private routerSnapshot:ActivatedRouteSnapshot,
  ) {
    this.initSettings();
  }

  async initSettings() {
    await this.gameSettingsService.getGameSettings(this.routerSnapshot.params.id);
    Socket.socket.on('characterChanged',(response:{character:ICharacter,gameId:string})=>{
      this.onCharacterChanged.next(response.character);
    });
  }

  async getCharacterById(characterId: number,gameId?:string): Promise<ICharacter> {
    const response: any = await this.http.get(`${environment.apiUrl}/sheets/${characterId}`).toPromise();
    if (response.sheet !=null) {
      const character:ICharacter = response.sheet;
      return character;  
    }

    this.router.navigate(["**"])
  }


  async getCharacters(){
    const response: any = await this.http.get(`${environment.apiUrl}/sheets`).toPromise();
    this.characters = response.sheetList;
    this.onCharacterListChanged.next(this.characters);
  }

  getSkillList(): ISkill[] {
    return this.skillList;
  }

  async deleteById(id: number): Promise<void> {
    await this.http.put(`${environment.apiUrl}/sheets/${id}/delete`,{}).toPromise();
    
    await this.getCharacters();
  }

  async updateCharacter(character: ICharacter) {
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/update`,{character:character}).toPromise();
    await this.getCharacterById(character.id);
  }

  async updateCharacterStats(character: ICharacter) {
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/update`,{character: character}).toPromise();
    this.getCharacterById(character.id);
  }

  async getDefaultAttributeList(): Promise<IAttribute[]> {
    this.attributeList = (await this.gameSettingsService.getGameSettings(this.routerSnapshot.params.id)).attributes;
    return this.attributeList;
  }

  async createNewCharacter(characterName:string) {
    await this.http.post(`${environment.apiUrl}/sheets/create`,{name:characterName}).toPromise();
    await this.getCharacters();
  }

  async createNewEquipment(equipmentName: string, quantity:number, characterId:number) {
    await this.http.post(`${environment.apiUrl}/sheets/${characterId}/equipment/create`,{id:generateRandomId(),name:equipmentName, quantity:quantity}).toPromise();
    this.getCharacterById(characterId);
  }

  
}

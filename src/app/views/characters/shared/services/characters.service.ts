import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { environment } from 'src/environments/environment';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';

import { ICharacter } from '../../../../../model/Character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  onCharacterChanged :BehaviorSubject<ICharacter> = new BehaviorSubject(null);
  onCharacterListChanged: BehaviorSubject<ICharacter[]> = new BehaviorSubject(null);

  constructor(private http:HttpClient,private gameSettingsService: GameSettingsService) {
    
  }

  private attributeList: IAttribute[] = [];
  private skillList: ISkill[] = [];

  private characters: ICharacter[] = [];

  async getCharacterById(characterId: number): Promise<ICharacter> {
    const response: any = await this.http.get(`${environment.apiUrl}/sheets/${characterId}`).toPromise();
    const character:ICharacter = response.sheet;

    this.onCharacterChanged.next(character);
    return character;
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
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/update`,{
      playerName:character.playerName,
      name: character.name, age: character.age, 
      gender:character.gender, 
      hp:character.hp, 
      maxHp:character.maxHp, 
      sanity:character.sanity, 
      maxSanity:character.maxSanity, 
      skills:character.skills, 
      attributes:character.attributes,
      notes:character.notes,
    }).toPromise();
    await this.getCharacterById(character.id);
  }

  async updateHp(currentHpValue: number, hpLimit: number, character: ICharacter) {
    character.hp = currentHpValue;
    character.maxHp = hpLimit;
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/status/update`,{character: character}).toPromise();
    this.onCharacterChanged.next(character);
  }

  async updateSanity(currentSanityValue: number, sanityLimit: number, character: ICharacter) {
    character.sanity = currentSanityValue;
    character.maxSanity = sanityLimit;
    await this.http.put(`${environment.apiUrl}/sheets/${character.id}/status/update`,{character: character}).toPromise();
    this.onCharacterChanged.next(character);
  }

  async getDefaultAttributeList(): Promise<IAttribute[]> {
    this.attributeList = (await this.gameSettingsService.getGameSettings()).attributes;
    return this.attributeList;
  }

  async createNewCharacter(characterName:string) {
    await this.http.post(`${environment.apiUrl}/sheets/create`,{name:characterName}).toPromise();
    await this.getCharacters();
  }
}

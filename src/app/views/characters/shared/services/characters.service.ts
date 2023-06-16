import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { generateRandomId } from 'src/app/views/common/view_utils';
import { environment } from 'src/environments/environment';
import { InventoryItem } from 'src/models/InventoryItem';
import { ISkill } from 'src/models/Skill';
import { IWeapon } from 'src/models/Weapon';

import { ICharacter } from '../../../../../models/Character';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/views/shared/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  equipmentList: InventoryItem[] = [];
  weaponList: IWeapon[] = [];

  private skillList: ISkill[] = [];

  private characters: ICharacter[] = [];

  constructor(
    private http: HttpClient,
    private gameSettingsService: GameSettingsService,
    private socketService: WebSocketService,
    private router: Router
  ) {
    this.initSettings();
  }

  async initSettings() {
    await this.gameSettingsService.getGameSettings();
  }

  async getCharacterById(characterId: number): Promise<ICharacter> {
    const response: any = await this.http
      .get(`${environment.apiUrl}/sheets/${characterId}`)
      .toPromise();
    if (response != null) {
      const character: ICharacter = response;

      return character;
    }

    this.router.navigate(['**']);
  }

  async getCharacters() {
    const response: any = await this.http
      .get(`${environment.apiUrl}/sheets`)
      .toPromise();

    return (this.characters = response);
  }

  getSkillList(): ISkill[] {
    return this.skillList;
  }

  async deleteById(id: number): Promise<void> {
    await firstValueFrom(
      this.http.put(`${environment.apiUrl}/sheets/${id}/delete`, {})
    );
  }

  async updateCharacter(character: ICharacter, characterJSON: string) {
    await this.http
      .put(`${environment.apiUrl}/sheets/${character.id}/update`, {
        character: JSON.parse(characterJSON),
      })
      .toPromise();
    await this.getCharacterById(character.id);
  }

  async updateCharacterStats(character: ICharacter, characterJSON: string) {
    await this.http
      .put(`${environment.apiUrl}/sheets/${character.id}/update`, {
        character: JSON.parse(characterJSON),
      })
      .toPromise();
    this.getCharacterById(character.id);
  }

  async createNewCharacter(characterName: string) {
    (await this.http
      .post(`${environment.apiUrl}/sheets/create`, { name: characterName })
      .toPromise()) as ICharacter;
  }

  async createNewEquipment(
    equipmentName: string,
    quantity: number,
    characterId: number
  ) {
    await this.http
      .post(`${environment.apiUrl}/sheets/${characterId}/equipment/create`, {
        id: generateRandomId(),
        name: equipmentName,
        quantity: quantity,
      })
      .toPromise();
    this.getCharacterById(characterId);
  }
}

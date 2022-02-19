import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAttribute } from 'src/model/Attribute';
import { GameSettings } from 'src/model/GameSettings';
import { ISkill } from 'src/model/Skill';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private gameSettings : GameSettings;

  constructor(private http:HttpClient, private route: Router) {}

  async getGameSettings() {
    const response: any = await this.http.get(`${environment.apiUrl}/gamesettings`).toPromise();
    console.log(response);
    this.gameSettings = response.gameSettings;
    return this.gameSettings;
  }

  setGameTimers(diceCooldown : number, diceScreenTime: number) {
    this.gameSettings.diceCooldown = diceCooldown;
    this.gameSettings.diceScreenTime = diceScreenTime;
  }

  addNewAttribute(attribute : IAttribute): void {
    this.gameSettings.attributes.push(attribute);
  }

  addNewSkill(skill : ISkill): void {
    this.gameSettings.skills.push(skill);
  }

  removeAttribute(attribute : IAttribute): void {
    this.gameSettings.attributes = this.gameSettings.attributes.filter(element => element.id != attribute.id);
  }

  removeSkill(skill : ISkill): void {
    this.gameSettings.skills = this.gameSettings.skills.filter(element => element.id != skill.id);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAttribute } from 'src/model/Attribute';
import { GameSettings } from 'src/model/GameSettings';
import { ISkill } from 'src/model/Skill';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private gameSettings : GameSettings;

  updateGameSettingsEvent$ :BehaviorSubject<GameSettings>;

  constructor(private http:HttpClient, private route: Router) {
    this.initSettings();
  }

  async initSettings(){
    this.updateGameSettingsEvent$ = new BehaviorSubject<GameSettings>(await this.getGameSettings());
  }

  async getGameSettings(): Promise<GameSettings> {
    const response: any = await this.http.get(`${environment.apiUrl}/gamesettings`).toPromise();
    this.gameSettings = response;
    return this.gameSettings;
  }

  async setGameTimers(diceCooldown : number, diceScreenTime: number) {
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/save/timers`,{
      diceCooldown: diceCooldown,
      diceScreenTime: diceScreenTime,
    }).toPromise();
    this.gameSettings = response;

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  // SKILLS AND PROPERTIES
  async setGameProperties(skillList : ISkill[], attributeList: IAttribute[]) {
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/save/properties`,{
      skills: skillList,
      attributes: attributeList,
    }).toPromise();
    this.gameSettings = response;
    console.log(response);
    this.gameSettings.skills = Array.of(response.skills);
    this.gameSettings.attributes = Array.of(response.attributes);

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  async removeAttribute(attribute : IAttribute) {
    this.gameSettings.attributes = this.gameSettings.attributes.filter(element => element.id != attribute.id);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
  }

  async removeSkill(skill : ISkill) {
    this.gameSettings.skills = this.gameSettings.skills.filter(element => element.id != skill.id);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
  }

  async createNewSkill(skillName: string, skillDescription:string) {
    if (skillName.length > 0 && skillDescription.length > 0) {
      await this.getGameSettings();
      let lastId;
      if (this.gameSettings.skills != null) {
        if (this.gameSettings.skills.length > 0) {
          lastId = this.gameSettings.skills[this.gameSettings.skills.length -1].id;
        }
        else {
          lastId = 0;
        }
      }
      else {
        lastId = 0;
      }
      

      const newSkill: ISkill = {
        id:lastId +1,
        name: skillName,
        description: skillDescription
      };
  
      if (this.gameSettings.skills != null) {
        this.gameSettings.skills.push(newSkill); 
      }
      else {
        this.gameSettings.skills = [newSkill];
      }
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
    }
  }

  async createNewAttribute(attributeName: string, attributeDescription:string){
    if (attributeName.length > 0 && attributeDescription.length > 0) {
      await this.getGameSettings();
      const lastId = this.gameSettings.attributes != null || this.gameSettings.attributes.length > 0 ? this.gameSettings.attributes[this.gameSettings.attributes.length -1].id : 0;
      const newAttribute: IAttribute = {
        id:lastId +1,
        name: attributeName,
        description: attributeDescription
      };

      if (this.gameSettings.attributes != null) {
        this.gameSettings.attributes.push(newAttribute); 
      }
      else {
        this.gameSettings.attributes = [newAttribute];
      }
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
    }
  }

  async editSkill(skillName: string, skillDescription:string, skillId: number) {
    if (skillName.length > 0 && skillDescription.length > 0) {
      this.gameSettings.skills.map((skill)=>{
        if (skill.id == skillId) {
          skill.name = skillName;
          skill.description = skillDescription;
        }
      });
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
    }
  }

  async editAttribute(attributeName: string, attributeDescription:string, attributeId: number) {
    if (attributeName.length > 0 && attributeDescription.length > 0) {
      this.gameSettings.attributes.map((attribute)=>{
        if (attribute.id == attributeId) {
          attribute.name = attributeName;
          attribute.description = attributeDescription;
        }
      });
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
    }
  }
}

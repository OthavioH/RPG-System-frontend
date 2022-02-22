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
    await this.getGameSettings();
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/save/properties`,{
      skills: skillList,
      attributes: attributeList,
    }).toPromise();
    this.gameSettings = response;
    this.gameSettings.skills = response.skills;
    this.gameSettings.attributes = response.attributes;

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  async removeAttribute(attributeId:number) {
    this.gameSettings.attributes = this.gameSettings.attributes.filter(element => element.id != attributeId);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
  }

  async removeSkill(skillId:number) {
    
    this.gameSettings.skills = this.gameSettings.skills.filter(element => element.id != skillId);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes);
  }

  async createNewSkill(skillName: string, skillDescription:string) {
    await this.getGameSettings();
    if (skillName.length > 0 && skillDescription.length > 0) {
      let greaterId = 0;
      if (this.gameSettings.skills != null) {
        for (let i = 0; i < this.gameSettings.skills.length; i++) {
          const skill = this.gameSettings.skills[i];
          if (skill.id > greaterId) {
            greaterId = skill.id;
          }
        }
      }
      else {
        greaterId = 0;
      }
      
      const newSkill: ISkill = {
        id:greaterId +1,
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
    await this.getGameSettings();
    
    if (attributeName.length > 0 && attributeDescription.length > 0) {
      let greaterId = 0;
      if (this.gameSettings.attributes != null) {
        for (let i = 0; i < this.gameSettings.attributes.length; i++) {
          const attribute = this.gameSettings.attributes[i];
          if (attribute.id > greaterId) {
            greaterId = attribute.id;
          }
        }
      }
      else {
        greaterId = 0;
      }
      const newAttribute: IAttribute = {
        id:greaterId +1,
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

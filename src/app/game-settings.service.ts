import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAbility } from 'src/models/Ability';
import { IAttribute } from 'src/models/Attribute';
import { IGameSettings } from 'src/models/GameSettings';
import { ISkill } from 'src/models/Skill';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private gameSettings : IGameSettings;

  updateGameSettingsEvent$ :BehaviorSubject<IGameSettings>;

  constructor(private http:HttpClient, private route: Router) {
    this.initSettings();
  }

  async initSettings(){
    this.updateGameSettingsEvent$ = new BehaviorSubject<IGameSettings>(await this.getGameSettings());
  }

  async getGameSettings(): Promise<IGameSettings> {
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
  async setGameProperties(skillList : ISkill[], attributeList: IAttribute[], abilitiesList: IAbility[]) {
    skillList = skillList != null ? skillList.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    attributeList = attributeList != null ? attributeList.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    abilitiesList = abilitiesList != null ? abilitiesList.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/properties/save/`,{
      skills: skillList,
      attributes: attributeList,
      abilities:abilitiesList,
    }).toPromise();
    this.gameSettings = response;
    this.gameSettings.skills = response.skills;
    this.gameSettings.attributes = response.attributes;
    this.gameSettings.abilities = response.abilities;

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  async removeAttribute(attributeId:string) {
    this.gameSettings.attributes = this.gameSettings.attributes.filter(element => element.id != attributeId);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
  }

  async removeSkill(skillId:string) {
    
    this.gameSettings.skills = this.gameSettings.skills.filter(element => element.id != skillId);
    await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
  }

  async createNewSkill(skillName: string, skillDescription:string) {
    if (skillName.length > 0 && skillDescription.length > 0) {
      const newSkill: ISkill = {
        id:this.generateRandomId(),
        name: skillName,
        description: skillDescription
      };
  
      if (this.gameSettings.skills != null) {
        this.gameSettings.skills.push(newSkill); 
      }
      else {
        this.gameSettings.skills = [newSkill];
      }
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
    }
  }
  async createNewAttribute(attributeName: string, abbreviation:string){
    if (attributeName.length > 0 && abbreviation.length > 0) {
      
      const newAttribute: IAttribute = {
        id:this.generateRandomId(),
        name: attributeName,
        abbreviation:abbreviation,
      };

      if (this.gameSettings.attributes != null) {
        this.gameSettings.attributes.push(newAttribute); 
      }
      else {
        this.gameSettings.attributes = [newAttribute];
      }
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
    }
  }

  async editSkill(skillName: string, skillDescription:string, skillId: string) {
    if (skillName.length > 0 && skillDescription.length > 0) {
      this.gameSettings.skills.map((skill)=>{
        if (skill.id == skillId) {
          skill.name = skillName;
          skill.description = skillDescription;
        }
      });
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
    }
  }

  async editAttribute(attributeName: string, attributeAbbreviation:string, attributeId: string) {
    if (attributeName.length > 0 && attributeAbbreviation.length > 0) {
      this.gameSettings.attributes.map((attribute)=>{
        if (attribute.id == attributeId) {
          attribute.name = attributeName;
          attribute.abbreviation = attributeAbbreviation;
        }
      });
  
      await this.setGameProperties(this.gameSettings.skills, this.gameSettings.attributes, this.gameSettings.abilities);
    }
  }

  generateRandomId():string {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
}

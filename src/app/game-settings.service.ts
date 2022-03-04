import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAbility } from 'src/models/Ability';
import { IAttribute } from 'src/models/Attribute';
import { IGameSettings } from 'src/models/GameSettings';
import { IRitual, RitualElement } from 'src/models/Ritual';
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
  async setGameProperties() {
    this.gameSettings.skills = this.gameSettings.skills != null ? this.gameSettings.skills.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    this.gameSettings.attributes = this.gameSettings.attributes != null ? this.gameSettings.attributes.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    this.gameSettings.abilities = this.gameSettings.abilities != null ? this.gameSettings.abilities.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    this.gameSettings.rituals = this.gameSettings.rituals != null ? this.gameSettings.rituals.sort((a,b) => a.id > b.id ? 1 : -1) : [];
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/properties/save/`,{
      skills: this.gameSettings.skills,
      attributes: this.gameSettings.attributes,
      abilities:this.gameSettings.abilities,
      rituals:this.gameSettings.rituals,
    }).toPromise();
    this.gameSettings = response;

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  async removeAttribute(attributeId:string) {
    this.gameSettings.attributes = this.gameSettings.attributes.filter(element => element.id != attributeId);
    await this.setGameProperties();
  }

  async removeSkill(skillId:string) {
    
    this.gameSettings.skills = this.gameSettings.skills.filter(element => element.id != skillId);
    await this.setGameProperties();
  }

  async removeAbility(abilityId:string) {
    this.gameSettings.abilities = this.gameSettings.abilities.filter(element => element.id != abilityId);
    await this.setGameProperties();
  }

  async removeRitual(ritualId:string) {
    this.gameSettings.rituals = this.gameSettings.rituals.filter(element => element.id != ritualId);
    await this.setGameProperties();
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
  
      await this.setGameProperties();
    }
  }

  async createNewRitual(name: string,circle: string,execution: string,range: string,target: string,duration: string,description: string,elements:RitualElement[]) {
    if (name.length > 0 && description.length > 0) {
      const newRitual: IRitual = {
        id:this.generateRandomId(),
        name:name,
        circle:circle,
        execution:execution,
        range:range,
        target:target,
        duration:duration,
        description:description,
        elements:elements,
      };
  
      if (this.gameSettings.rituals != null) {
        this.gameSettings.rituals.push(newRitual); 
      }
      else {
        this.gameSettings.rituals = [newRitual];
      }
  
      await this.setGameProperties();
    }
  }

  async createNewAbility(abilityName: string, abilityDescription:string) {
    if (abilityName.length > 0 && abilityDescription.length > 0) {
      const newability: IAbility = {
        id:this.generateRandomId(),
        name: abilityName,
        description: abilityDescription
      };
  
      if (this.gameSettings.abilities != null) {
        this.gameSettings.abilities.push(newability); 
      }
      else {
        this.gameSettings.abilities = [newability];
      }
  
      await this.setGameProperties();
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
  
      await this.setGameProperties();
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
  
      await this.setGameProperties();
    }
  }

  async editRitual(editedRitual: IRitual) {
    this.gameSettings.rituals.map((ritual)=>{
      if (ritual.id == editedRitual.id) {
        ritual = editedRitual;
      }
    });

    await this.setGameProperties();
  }

  async editAbility(abilityName: string, abilityDescription:string, abilityId: string) {
    if (abilityName.length > 0 && abilityDescription.length > 0) {
      this.gameSettings.abilities.map((ability)=>{
        if (ability.id == abilityId) {
          ability.name = abilityName;
          ability.description = abilityDescription;
        }
      });
  
      await this.setGameProperties();
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
  
      await this.setGameProperties();
    }
  }

  generateRandomId():string {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
}

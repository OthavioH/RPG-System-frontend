import { HttpClient,} from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'src/models/SocketClass';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { IAbility } from 'src/models/Ability';
import { IAttribute } from 'src/models/Attribute';
import { IGameSettings } from 'src/models/GameSettings';
import { IRitual, RitualElement } from 'src/models/Ritual';
import { ISkill } from 'src/models/Skill';
import { SkillExperienceLevel } from 'src/models/SkillExperienceLevel';
import { IDiceRoll } from 'src/models/DiceRoll';
import { generateRandomId } from './views/common/view_utils';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private gameSettings : IGameSettings;
  private onRollsListChanged:Subject<IDiceRoll[]> = new Subject<IDiceRoll[]>();
  onRollsListChanged$ = this.onRollsListChanged.asObservable();

  private onNewTimerEmitted: Subject<number> = new Subject<number>();
  onNewTimerEmitted$ = this.onNewTimerEmitted.asObservable();

  port:number;

  updateGameSettingsEvent$ :Subject<IGameSettings> = new Subject<IGameSettings>();

  constructor(private http:HttpClient, private router: Router,private activatedRoute: ActivatedRoute) {
    Socket.socket = io(`${environment.apiUrl}`);
    this.initSettings();
  }

  async initSettings(){

    Socket.socket.on('lastRollListChanged',(response:{actualRollList:any[],gameId:string})=>{
      if (this.gameSettings.id == response.gameId) {
        this.onRollsListChanged.next(response.actualRollList);
        this.gameSettings.lastRolls = response.actualRollList;
      }
    });

    Socket.socket.on('diceOnCooldown',(response:{timer:number,gameId:string})=>{
      if (this.gameSettings.id == response.gameId) {
        this.onNewTimerEmitted.next(response.timer);
      }
    });
  }

  emitTimer(timer:number) {
    Socket.socket.emit('diceRoll',{timer:timer,gameId:this.gameSettings.id});
  }

  async getGameSettings(id:string): Promise<IGameSettings> {
    const response: any = await this.http.get(`${environment.apiUrl}/gamesettings?id=${id}`).toPromise();
    this.gameSettings = response;
    return this.gameSettings;
  }

  async createNewGame():Promise<void> {
    const id = generateRandomId();
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/create`,{id:id}).toPromise();
    this.router.navigate([`/dashboard/${response.id}`],);
  }

  async setGameTimers(diceCooldown : number, diceScreenTime: number,gameId:string) {
    
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/timers/save?id=${gameId}`,{
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
    const response: any = await this.http.post(`${environment.apiUrl}/gamesettings/properties/save?id=${this.gameSettings.id}`,{
      skills: this.gameSettings.skills,
      attributes: this.gameSettings.attributes,
      abilities:this.gameSettings.abilities,
      rituals:this.gameSettings.rituals,
    }).toPromise();
    this.gameSettings = response;

    this.updateGameSettingsEvent$.next(this.gameSettings);
  }

  async addNewRoll(roll: IDiceRoll) {
    await this.http.post(`${environment.apiUrl}/gamesettings/roll/save?id=${this.gameSettings.id}`,{
      roll: roll,
      oldRollList: this.gameSettings.lastRolls ?? [],
    }).toPromise();
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
        id:generateRandomId(),
        name: skillName,
        description: skillDescription,
        value:0,
        experienceLevel:SkillExperienceLevel.untrained,
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

  async createNewRitual(name: string,circle: number,execution: string,range: string,target: string,duration: string,description: string,resistance: string,elements:RitualElement[]) {
    if (name.length > 0 && description.length > 0) {
      const newRitual: IRitual = {
        id:generateRandomId(),
        name:name,
        circle:circle,
        execution:execution,
        range:range,
        target:target,
        duration:duration,
        description:description,
        elements:elements,
        resistance:resistance,
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
        id:generateRandomId(),
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
        id:generateRandomId(),
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
    const foundRitualIndex = this.gameSettings.rituals.findIndex((value,index,obj)=>value.id == editedRitual.id)

    if (foundRitualIndex != -1) {
      this.gameSettings.rituals[foundRitualIndex] = editedRitual;
      await this.setGameProperties();
    }
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

}

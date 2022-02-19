import { Injectable } from '@angular/core';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';

import { ICharacter as ICharacter } from '../../../../../model/Character';

@Injectable({
  providedIn: 'root'
})
export class CaracthersService {

  constructor() {
    
  }

  private attributeList: IAttribute[] = [];
  private skillList: ISkill[] = [];

  private characters: ICharacter[] = [];

  getCharacters(): ICharacter[]{
    return this.characters;
  }

  getSkillList(): ISkill[] {
    return this.skillList;
  }

  getAttributeList(): IAttribute[] {
    return this.attributeList;
  }

  createNewCharacter(characterName:string): void {
    this.characters.push({id:this.characters.length + 1,nome:characterName});
  }
}

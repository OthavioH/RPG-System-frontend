import { ICharacter } from "src/models/Character";
import { v4 as uuid } from 'uuid';

export function generateRandomId():string {
    const id = uuid();
    console.log(id);
    return uuid();
  }

export function findCharacterIndex(characterList:ICharacter[], characterToFind:ICharacter):number {
   const character = characterList.find(c => c.id == characterToFind.id);
   return characterList.indexOf(character);
}